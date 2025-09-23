import { useState } from "react";
import { isRequired, isEmpty, isValueFilled } from "../utils/AnswerLogic";

export default function useSurveyNavigation({
  data,
  variables,
  answers,
  submitAnswersFn,
  surveyId,
  user,
  startDate,
  answersave,
  tester,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Matris cevabında beklenen satır|sütun eşleşmesini kontrol et
  const checkMatrixMatch = (answerValue, expectedValue) => {
    if (!answerValue) return false;
    const [expectedRow, expectedCol] = expectedValue.split("|");
    if (typeof answerValue === "object" && !Array.isArray(answerValue)) {
      const actualValue = (answerValue[expectedRow] || "").trim().toLowerCase();
      return actualValue === expectedCol;
    }
    if (Array.isArray(answerValue)) {
      return answerValue.some(
        (cell) =>
          cell.rowId?.trim().toLowerCase() === expectedRow &&
          cell.colId?.trim().toLowerCase() === expectedCol &&
          cell.value !== undefined &&
          cell.value !== null &&
          cell.value !== ""
      );
    }
    return false;
  };

  const checkTableMatch = (answerValue, expectedValue) => {
    if (!answerValue) return false;
    const [expectedRow, expectedCol] = expectedValue
      .split("|")
      .map((s) => s.trim());
    if (typeof answerValue === "object" && !Array.isArray(answerValue)) {
      // Öncelikle satır objesini al
      const rowObj = answerValue[expectedRow];
      if (!rowObj || typeof rowObj !== "object") return false;

      // Sütun değerini al
      const actualValue = rowObj[expectedCol];

      // Hücre dolu mu kontrolü (boş değil, undefined değil)
      return (
        actualValue !== undefined && actualValue !== null && actualValue !== ""
      );
    }
    if (Array.isArray(answerValue)) {
      const cell = answerValue.find(
        (cell) => cell.rowId === expectedRow && cell.colId === expectedCol
      );
      return (
        cell !== undefined &&
        cell.value !== undefined &&
        cell.value !== null &&
        cell.value !== ""
      );
    }
    return false;
  };

  // Bir sorunun gösterilip gösterilmeyeceğini belirle
  const canDisplayQuestion = (questionId) => {
    const question = data.find((q) => q.id === questionId);
    if (!question) return false;
    if (question.id.includes("welcome") || question.id.includes("finish"))
      return true;
    const relatedRules = variables.filter(
      (v) =>
        v.trueDestinationItemId === questionId ||
        v.falseDestinationItemId === questionId
    );
    if (relatedRules.length === 0) return true;
    for (const rule of relatedRules) {
      const answer = answers[rule.itemId];
      let matched = false;
      switch (rule.conditionType) {
        case "exists":
          matched = !!answer;
          break;
        case "not_exists":
          matched = !answer;
          break;
        case "match":
          if (!answer) matched = false;
          else if (answer.value && Array.isArray(answer.value)) {
            matched = answer.value.some(
              (item) =>
                item.title === rule.expectedValue ||
                item.url === rule.expectedValue
            );
          } else {
            matched = answer === rule.expectedValue;
          }
          break;
        default:
          matched = false;
      }
      if (rule.trueDestinationItemId === questionId && matched) return true;
      if (rule.falseDestinationItemId === questionId && !matched) return true;
    }
    return false;
  };

  // Sonraki soruya geçiş
  const goNext = async () => {
    const currentItem = data[currentIndex];
    const currentValue = answers[currentItem?.id];
    if (
      !tester &&
      isRequired(currentItem) &&
      isEmpty(currentItem, currentValue)
    ) {
      throw new Error("Bu alan zorunludur.");
    }
    let nextIndex = null;
    const relatedVariables = variables.filter(
      (v) => v.itemId === currentItem?.id
    );
    for (const variable of relatedVariables) {
      let goToItemId = null;
      let conditionMatched = false;
      if (variable.conditionType === "match") {
        if (
          currentItem.type === "Matris" &&
          variable.conditionType === "match"
        ) {
          conditionMatched = checkMatrixMatch(
            currentValue,
            variable.expectedValue
          );
        } else if (
          currentItem.type === "Table" &&
          variable.conditionType === "match"
        ) {
          conditionMatched = checkTableMatch(
            currentValue,
            variable.expectedValue
          );
        } else {
          if (currentValue?.value && Array.isArray(currentValue.value)) {
            const expected = variable.expectedValue.toLowerCase();
            conditionMatched = currentValue.value.some((item) => {
              const title = item.title?.toLowerCase() || "";
              const url = item.url?.toLowerCase() || "";
              return title === expected || url === expected;
            });
          } else {
            conditionMatched = currentValue === variable.expectedValue;
          }
        }
      } else if (variable.conditionType === "exists") {
        conditionMatched = isValueFilled(currentValue);
      } else if (variable.conditionType === "not_exists") {
        conditionMatched = !isValueFilled(currentValue);
      }
      if (conditionMatched) goToItemId = variable.trueDestinationItemId;
      else if (variable.falseDestinationItemId)
        goToItemId = variable.falseDestinationItemId;
      if (goToItemId) {
        const idx = data.findIndex((q) => q.id === goToItemId);
        if (idx !== -1) {
          nextIndex = idx;
          break;
        }
      }
    }

    if (nextIndex !== null) {
      setHistory((prev) => [...prev, currentIndex]);
      setCurrentIndex(nextIndex);
    } else if (currentIndex < data.length - 1) {
      let nextIdx = currentIndex + 1;
      while (nextIdx < data.length && !canDisplayQuestion(data[nextIdx].id)) {
        nextIdx++;
      }
      if (nextIdx < data.length) {
        setHistory((prev) => [...prev, currentIndex]);
        setCurrentIndex(nextIdx);
      } else {
        await submitAnswersFn(
          answers,
          data,
          surveyId,
          user,
          startDate,
          answersave
        );
        setSubmitted(true);
      }
    } else {
      await submitAnswersFn(
        answers,
        data,
        surveyId,
        user,
        startDate,
        answersave
      );
      setSubmitted(true);
    }
  };

  // Önceki soruya git
  const goBack = () => {
    if (history.length > 0) {
      const lastIndex = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentIndex(lastIndex);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    currentIndex,
    submitted,
    setSubmitted,
    goNext,
    goBack,
  };
}

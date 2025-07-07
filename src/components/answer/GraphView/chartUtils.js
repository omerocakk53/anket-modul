// components/analytics/GraphView/chartUtils.js
import { startOfDay, startOfWeek, startOfMonth, format } from "date-fns";

export function groupByDate(answers, groupBy) {
  const grouped = {};

  answers.forEach((entry) => {
    const date = new Date(entry.createdAt);

    let keyDate;
    switch (groupBy) {
      case "weekly":
        keyDate = startOfWeek(date, { weekStartsOn: 1 }); // Pazartesi başlangıç
        break;
      case "monthly":
        keyDate = startOfMonth(date);
        break;
      case "daily":
      default:
        keyDate = startOfDay(date);
        break;
    }

    const key = format(keyDate, "yyyy-MM-dd");

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  });

  return grouped;
}

export function averageByQuestion(groupedData, questionId, numericTypes) {
  const result = [];

  Object.entries(groupedData).forEach(([dateKey, entries]) => {
    let sum = 0;
    let count = 0;

    entries.forEach((entry) => {
      const answer = entry.answers.find(
        (a) => a.itemId === questionId && numericTypes.includes(a.itemType) && typeof a.value === "number"
      );
      if (answer) {
        sum += answer.value;
        count++;
      }
    });

    if (count > 0) {
      result.push({ date: dateKey, value: sum / count });
    }
  });

  return result;
}

export function countMultipleChoiceAnswers(groupedData, questionId, options) {
  // Çoktan seçmeli sorular için her seçeneğin sayısını tarih bazında döner
  const result = [];

  Object.entries(groupedData).forEach(([dateKey, entries]) => {
    const counts = {};
    options.forEach((opt) => {
      counts[opt] = 0;
    });

    entries.forEach((entry) => {
      const answer = entry.answers.find(
        (a) => a.itemId === questionId && Array.isArray(a.value)
      );
      if (answer) {
        answer.value.forEach((val) => {
          if (counts[val] !== undefined) {
            counts[val]++;
          }
        });
      }
    });

    result.push({ date: dateKey, ...counts });
  });

  return result;
}

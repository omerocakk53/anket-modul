import {
  analyzeChoiceCounts,
  generateChoiceChartData,
  generatePieData,
  sortChoiceCounts,
} from "./choiceUtils";

import { analyzeAverage } from "./numericUtils";

import {
  analyzeMatrixAnswers,
  generateMatrixCellData,
  findMatrixMostSelected,
} from "./matrixUtils";

export function analyzeSurveyAnswers(survey, answersA, answersB) {
  if (!survey?.items || !Array.isArray(answersA) || !Array.isArray(answersB))
    return [];

  return survey.items.map((question) => {
    const { id, type } = question;

    if (["MultipleChoice", "Dropdown", "ImageChoice"].includes(type)) {
      const analysisA = analyzeChoiceCounts(answersA, question);
      const analysisB = analyzeChoiceCounts(answersB, question);
      return {
        question,
        type,
        analysisA,
        analysisB,
        chartData: {
          choice: true,
          data: generateChoiceChartData(analysisA.counts, analysisB.counts),
          pieDataA: generatePieData(analysisA.counts),
          pieDataB: generatePieData(analysisB.counts),
          sortedA: sortChoiceCounts(analysisA.counts),
          sortedB: sortChoiceCounts(analysisB.counts),
        },
      };
    }

    if (["Matris"].includes(type)) {
      // answersA ve answersB, iki farklı tarih aralığından gelen cevap dizileri
      const countsA = analyzeMatrixAnswers(answersA, question);
      const countsB = analyzeMatrixAnswers(answersB, question);

      return {
        question,
        type: question.type,
        mostA: findMatrixMostSelected(countsA), // Tarih 1 için her satırdaki en çok seçilen sütun
        mostB: findMatrixMostSelected(countsB), // Tarih 2 için aynı şekilde
        chartData: {
          matrix: true,
          cellData: generateMatrixCellData(countsA, countsB), // Grafik için veriler
        },
      };
    }

    if (["Table"].includes(type)) {
      const countsA = analyzeMatrixAnswers(answersA, question);
      const countsB = analyzeMatrixAnswers(answersB, question);

      return {
        question,
        type: question.type,
        mostA: findMatrixMostSelected(countsA), // Tarih 1 için her satırdaki en çok seçilen sütun
        mostB: findMatrixMostSelected(countsB), // Tarih 2 için aynı şekilde
        chartData: {
          matrix: true,
          cellData: generateMatrixCellData(countsA, countsB), // Grafik için veriler
        },
      };
    }

    if (["Numeric", "Rating", "Scale"].includes(type)) {
      const avgA = analyzeAverage(answersA, id);
      const avgB = analyzeAverage(answersB, id);
      const difference = avgB - avgA;
      const percentChange =
        avgA !== 0
          ? ((difference / avgA) * 100).toFixed(1)
          : avgB > 0
            ? "∞"
            : "0";

      return {
        question,
        type,
        avgA,
        avgB,
        difference,
        percentChange,
        chartData: {
          numeric: true,
          data: [
            {
              name: question.title || question.label,
              "Tarih 1": avgA,
              "Tarih 2": avgB,
            },
          ],
          diffData: [
            {
              name: question.title || question.label,
              "Fark (%)": parseFloat(percentChange),
            },
          ],
        },
      };
    }

    return {
      question,
      type,
      message: "Bu tip için analiz tanımlı değil.",
    };
  });
}

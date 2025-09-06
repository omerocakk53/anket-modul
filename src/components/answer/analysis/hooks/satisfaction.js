export const satisfactionWeights = {
  "Çok Kötü": 0,
  Kötü: 25,
  Orta: 50,
  İyi: 75,
  "Çok İyi": 100,
  "Kesinlikle Katılmıyorum": 0,
  Katılmıyorum: 25,
  Kararsızım: 50,
  Katılıyorum: 75,
  "Kesinlikle Katılıyorum": 100,
};

/**
 * Memnuniyet oranını hesaplar.
 *
 * @param {number[][]} matrixData - 2D sayı matrisi: cevap adetleri
 * @param {string[]} columnLabels - Sütun isimleri
 * @param {Object} weights - Her sütun için ağırlık değeri, default olarak satisfactionWeights kullanılır.
 * @returns {number} - % cinsinden memnuniyet oranı (0-100 arasında)
 */
export function calculateSatisfactionRate(
  matrixData,
  columnLabels,
  weights = satisfactionWeights,
) {
  let totalScore = 0;
  let maxScore = 0;

  matrixData.forEach((row) => {
    row.forEach((count, colIdx) => {
      const weight = weights[columnLabels[colIdx]] ?? 0;
      totalScore += count * weight;
      maxScore += count * 100;
    });
  });

  if (maxScore === 0) return 0;
  return (totalScore / maxScore) * 100;
}

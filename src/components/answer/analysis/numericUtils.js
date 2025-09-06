/**
 * Sayısal türdeki sorular için ortalama hesaplar.
 * @param {Array} answers
 * @param {string} questionId
 * @returns {number} Ortalama
 */
export function analyzeAverage(answers, questionId) {
  if (!Array.isArray(answers)) return 0;

  let total = 0;
  let count = 0;

  answers.forEach((ansGroup) => {
    const found = ansGroup.answers?.find((a) => a.itemId === questionId);
    if (!found) return;

    let values = Array.isArray(found.value) ? found.value : [found.value];
    values = values.filter((v) => v !== null && v !== undefined);

    values.forEach((v) => {
      if (typeof v === "object") {
        Object.values(v).forEach((val) => {
          const num = parseFloat(val);
          if (!isNaN(num)) {
            total += num;
            count++;
          }
        });
      } else {
        const num = parseFloat(v);
        if (!isNaN(num)) {
          total += num;
          count++;
        }
      }
    });
  });

  return count === 0 ? 0 : parseFloat((total / count).toFixed(2));
}

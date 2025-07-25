/**
 * Cevaplardan seçim sayılarını analiz eder
 * @param {Array} answers
 * @param {Object} question
 * @returns {{ counts: Object, maxChoice: { choice: string, count: number } | null }}
 */
export function analyzeChoiceCounts(answers, question) {
  if (!Array.isArray(answers)) return { counts: {}, maxChoice: null };

  const counts = {};

  answers.forEach(ansGroup => {
    const found = ansGroup.answers?.find(a => a.itemId === question.id);
    if (!found) return;

    let values = found.value;
    if (!values) return;

    if (!Array.isArray(values)) values = [values];

    values.forEach(v => {
      let key = null;

      if (typeof v === 'string') key = v;
      else if (typeof v === 'object' && v !== null) {
        if ('title' in v) key = v.title;
        else if ('value' in v) key = v.value;
        else key = JSON.stringify(v);
      }

      if (key) {
        counts[key] = (counts[key] || 0) + 1;
      }
    });
  });

  let maxChoice = null;
  let maxCount = -1;
  for (const [key, val] of Object.entries(counts)) {
    if (val > maxCount) {
      maxCount = val;
      maxChoice = key;
    }
  }

  return {
    counts,
    maxChoice: maxChoice ? { choice: maxChoice, count: maxCount } : null,
  };
}

/**
 * Bar Chart için ortak data üretir
 */
export function generateChoiceChartData(countsA, countsB) {
  const keys = Array.from(new Set([...Object.keys(countsA), ...Object.keys(countsB)]));
  return keys.map(key => ({
    name: key,
    'Tarih 1': countsA[key] || 0,
    'Tarih 2': countsB[key] || 0,
  }));
}

/**
 * Pie chart için veri üret
 */
export function generatePieData(counts) {
  return Object.entries(counts).map(([name, value]) => ({
    name,
    value
  }));
}

/**
 * Sıralı liste için
 */
export function sortChoiceCounts(counts) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([choice, count]) => ({ choice, count }));
}

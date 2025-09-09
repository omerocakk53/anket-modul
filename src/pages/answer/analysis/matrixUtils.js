export function analyzeMatrixAnswers(answers, question) {
  const rows = question.data?.rows || [];
  const columns = question.data?.columns || [];

  // Başlangıçta anket tanımına göre 0 ile doldurulmuş counts objesi
  const counts = {};

  rows.forEach((row) => {
    counts[row] = {};
    columns.forEach((col) => {
      counts[row][col] = 0;
    });
  });

  // Gelen cevaplarda matris sorusunu bulup sayım yap
  answers.forEach((answerGroup) => {
    const matrixAnswer = answerGroup.answers?.find(
      (a) => a.itemId === question.id,
    );
    if (!matrixAnswer || typeof matrixAnswer.value !== "object") return;

    Object.entries(matrixAnswer.value).forEach(([row, col]) => {
      // Dinamik olarak yeni satır/sütun ekleme (anket dışı)
      if (!counts[row]) counts[row] = {};
      if (counts[row][col] === undefined) counts[row][col] = 0;

      counts[row][col]++;
    });
  });

  return counts;
}

/**
 * İki tarih aralığından gelen counts objelerini alır,
 * satır-sütun bazında grafik için uygun formatta dizi oluşturur.
 *
 * @param {Object} countsA - Tarih 1 sayım objesi
 * @param {Object} countsB - Tarih 2 sayım objesi
 * @returns {Array} - [ { name: "Satır → Sütun", row, column, 'Tarih 1': n, 'Tarih 2': m }, ... ]
 */
export function generateMatrixCellData(countsA, countsB) {
  // Tüm satırları birleştir (set ile uniq)
  const allRows = new Set([
    ...Object.keys(countsA || {}),
    ...Object.keys(countsB || {}),
  ]);

  // Tüm sütunları bul
  const allCols = new Set();
  allRows.forEach((row) => {
    Object.keys(countsA?.[row] || {}).forEach((c) => allCols.add(c));
    Object.keys(countsB?.[row] || {}).forEach((c) => allCols.add(c));
  });

  // Diziye dönüştür
  const rows = Array.from(allRows);
  const cols = Array.from(allCols);

  // Satır-sütun kombinasyonlarının data objelerini oluştur
  const data = [];

  rows.forEach((row) => {
    cols.forEach((col) => {
      data.push({
        name: `${row} → ${col}`,
        row,
        column: col,
        "Tarih 1": countsA?.[row]?.[col] || 0,
        "Tarih 2": countsB?.[row]?.[col] || 0,
      });
    });
  });

  return data;
}

/**
 * Satır bazında en çok seçilen sütunları bulur.
 *
 * @param {Object} counts - { row: { column: count } }
 * @returns {Object} mostSelected - { row: { column: string, count: number } }
 */
export function findMatrixMostSelected(counts) {
  const mostSelected = {};

  Object.entries(counts || {}).forEach(([row, cols]) => {
    let maxCount = -1;
    let maxCol = null;

    Object.entries(cols || {}).forEach(([col, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxCol = col;
      }
    });

    mostSelected[row] = { column: maxCol, count: maxCount };
  });

  return mostSelected;
}

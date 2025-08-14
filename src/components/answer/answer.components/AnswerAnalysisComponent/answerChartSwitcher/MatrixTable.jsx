import React, { forwardRef } from 'react';

const MatrixTable = forwardRef(({ rawCounts }, ref) => {
  const parseRawCounts = (rawCounts) => {
    const rowSet = new Set();
    const columnSet = new Set();

    Object.keys(rawCounts).forEach((key) => {
      const [row, col] = key.split(':').map((s) => s.trim());
      rowSet.add(row);
      columnSet.add(col);
    });

    const rowLabels = Array.from(rowSet).sort((a, b) => parseInt(a) - parseInt(b));
    const columnLabels = Array.from(columnSet).sort();
    const matrixData = rowLabels.map(() => columnLabels.map(() => 0));

    Object.entries(rawCounts).forEach(([key, value]) => {
      const [row, col] = key.split(':').map((s) => s.trim());
      const rowIdx = rowLabels.indexOf(row);
      const colIdx = columnLabels.indexOf(col);
      if (rowIdx !== -1 && colIdx !== -1) {
        matrixData[rowIdx][colIdx] = value.count;
      }
    });

    return { rowLabels, columnLabels, matrixData };
  };

  const { rowLabels, columnLabels, matrixData } = parseRawCounts(rawCounts || {});
  const rowTotals = matrixData.map((row) => row.reduce((a, b) => a + b, 0));
  const columnTotals = columnLabels.map((_, i) => matrixData.reduce((sum, row) => sum + row[i], 0));
  const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

  return (
    <div className="overflow-auto w-full mt-4" style={{ maxHeight: '450px' }}>
      <table className="min-w-[600px] w-full text-sm border border-gray-300" ref={ref}>
        <thead className="bg-gray-100 font-semibold">
          <tr>
            <th className="px-3 py-2 border">Satır / Sütun</th>
            {columnLabels.map((col) => (
              <th key={col} className="px-3 py-2 border">{col}</th>
            ))}
            <th className="px-3 py-2 border">Toplam</th>
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((rowLabel, i) => (
            <tr key={rowLabel} className="even:bg-gray-50 hover:bg-blue-50">
              <td className="px-3 py-2 border">{rowLabel}</td>
              {matrixData[i].map((val, j) => (
                <td key={j} className="px-3 py-2 border">{val}</td>
              ))}
              <td className="px-3 py-2 border font-semibold">{rowTotals[i]}</td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td className="px-3 py-2 border">Toplam</td>
            {columnTotals.map((total, idx) => (
              <td key={idx} className="px-3 py-2 border">{total}</td>
            ))}
            <td className="px-3 py-2 border">{grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default MatrixTable;

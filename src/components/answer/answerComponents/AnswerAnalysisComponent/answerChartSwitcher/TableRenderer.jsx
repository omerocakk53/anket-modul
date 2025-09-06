import React, { forwardRef } from 'react';
import MatrixTable from './MatrixTable';
import CustomTable from './CustomTable';

const TableRenderer = forwardRef(({
  labels, data, total,
  questionType, rawCounts,
  tableData, questionMemberSatificaitonMatris
}, ref) => {

  const renderDefaultTable = () => (
    <table className="w-full border border-gray-300 text-sm" ref={ref}>
      <thead>
        <tr className="bg-gray-100 font-semibold">
          <th className="px-3 py-2 border">Seçenek</th>
          <th className="px-3 py-2 border">Sıklık</th>
          <th className="px-3 py-2 border">Yüzdesi</th>
        </tr>
      </thead>
      <tbody>
        {labels.map((label, i) => (
          <tr key={label} className="even:bg-gray-50 hover:bg-blue-50">
            <td className="px-3 py-2 border">{label}</td>
            <td className="px-3 py-2 border">{data[i]}</td>
            <td className="px-3 py-2 border">
              {total ? ((data[i] / total) * 100).toFixed(1) + '%' : '0%'}
            </td>
          </tr>
        ))}
        <tr className="bg-gray-200 font-semibold">
          <td className="px-3 py-2 border">Toplam</td>
          <td className="px-3 py-2 border">{total}</td>
          <td className="px-3 py-2 border">100%</td>
        </tr>
      </tbody>
    </table>
  );

  if (questionType === 'Matris') {
    return (
      <MatrixTable
        rawCounts={rawCounts}
        questionMemberSatificaitonMatris={questionMemberSatificaitonMatris}
        ref={ref}
      />
    );
  }
  if (questionType === 'Table') {
    return <CustomTable tableData={tableData} ref={ref} />;
  }

  return renderDefaultTable();
});

export default TableRenderer;

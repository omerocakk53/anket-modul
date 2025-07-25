import React from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * answers: [{ _id, createdAt, answers: [{ itemId, value }] }]
 * survey:  { items: [{ id, title }] }
 */
const ExportButtons = ({ answers = [], survey = {}, filename = 'veriler' }) => {
  const columns = ['_id', 'createdAt', ...(survey.items || []).map(i => i.id)];

  const transformData = () => {
    return answers.map(ans => {
      const row = {
        ID: ans._id,
        Tarih: new Date(ans.createdAt).toLocaleString(),
      };

      (survey.items || []).forEach(item => {
        const matched = ans.answers.find(a => a.itemId === item.id);
        let val = matched?.value ?? '';
        if (Array.isArray(val)) val = val.join(', ');
        else if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
        row[item.title || item.id] = val;
      });

      return row;
    });
  };

  const handleExcelExport = () => {
    const exportData = transformData();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cevaplar');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
  };

  const transformedData = transformData();

  return (
    <div className="flex flex-wrap gap-3 my-4">
      <CSVLink
        data={transformedData}
        filename={`${filename}.csv`}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
      >
        CSV Dışa Aktar
      </CSVLink>
      <button
        onClick={handleExcelExport}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium"
      >
        Excel Dışa Aktar
      </button>
    </div>
  );
};

export default ExportButtons;

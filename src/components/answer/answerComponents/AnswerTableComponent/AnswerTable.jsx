import React, { useState } from 'react';
import { FaExternalLinkAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AnswerSheet from './AnswerSheet';

const AnswerTable = ({ survey, answers, visibleColumns, onDelete }) => {
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [RenderAnswerSheet, setRenderAnswerSheet] = useState({ status: false, id: 0 });

  const handleViewAnswerSheet = (status, id) => setRenderAnswerSheet({ status, id });

  const toggleRow = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    setSelected(allSelected ? [] : answers.map((a) => a._id));
    setAllSelected((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      onDelete(selected);
      setSelected([]);
      setAllSelected(false);
    } catch {
      toast.error('Silme hatası');
    }
  };

  const renderAnswerValue = (columnKey, ans) => {
    if (columnKey == "_id") {
      return ans[columnKey];
    } else if (columnKey == "createdAt") {
      return new Date(ans[columnKey]).toLocaleString("tr-TR");
    }
    const answer = ans.answers.find((a) => a.itemId === columnKey);
    console.log(answer)
    if (!answer) return '-';
    switch (answer.itemType) {
      case 'MultipleChoice':
        return (
          <div className="flex flex-wrap gap-1">
            {answer.value.map((option, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm"
              >
                {option}
              </span>
            ))}
          </div>
        );
      case 'ImageChoice':
        return (
          <div className="flex flex-wrap gap-2">
            {answer.value.map((img, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <img src={img.url} alt={img.title} className="w-8 h-8 rounded object-cover border" />
                <span className="text-xs  max-w-[100px]" title={img.title}>
                  {img.title}
                </span>
              </div>
            ))}
          </div>
        );
      case 'QuestionGroup':
        return (
          <div className="space-y-1">
            {answer.value.map((group, idx) => (
              <div key={idx} className="bg-gray-50 p-2 rounded border text-xs">
                {Object.entries(group).map(([q, val]) => (
                  <div key={q}>
                    <span className="font-semibold">{q}:</span> {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      case 'Matris':
        return (
          <div className="space-y-1 text-xs">
            {Object.entries(answer.value).map(([row, val]) => (
              <div key={row}>
                <span className="font-semibold">{row}:</span> {val}
              </div>
            ))}
          </div>
        );
      case 'Table':
        return (
          <div className="space-y-1 text-xs">
            {Object.entries(answer.value).map(([key, obj]) => (
              <>
              <div key={key}>
                <span className="font-semibold">{key}:</span>
                {Object.entries(obj).map(([row, value]) => (
                  <div key={row}>
                    <span className="font-semibold">{row}:</span> {value}
                  </div>
                ))}
              </div>
              <hr />
              </>
            ))}
          </div>
        );
      default:
        return (
          <span className="block max-w-[180px]" title={answer.value}>
            {answer.value}
          </span>
        );
    }
  };

  return (
    <>
      {RenderAnswerSheet.status ? (
        <AnswerSheet
          survey={survey}
          id={RenderAnswerSheet.id}
          answers={answers}
          backToList={() => handleViewAnswerSheet(false, 0)}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleDelete}
              disabled={selected.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow 
            ${selected.length > 0 ? 'bg-danger hover:bg-danger text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              <FaTrash /> Seçilenleri Sil {selected.length}
            </button>
          </div>

          <div className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-2xl shadow-md max-h-[500px] w-full bg-white">
            <table className="table-fixed min-w-full text-sm text-gray-700 bg-white">
              <thead className="bg-white text-gray-700 sticky top-0 z-20 shadow-sm text-xs">
                <tr>
                  <th className="w-10 p-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="accent-blue-500"
                    />
                  </th>
                  <th className="sticky left-0 bg-white p-3 font-semibold w-36 border-r">
                    Kullanıcı Adı
                  </th>
                  <th className="p-3 text-center w-32">Cevap Kağıdı</th>
                  {visibleColumns
                    .map((c) => (
                      <th key={c} className="p-3 whitespace-nowrap font-semibold w-35">
                        {c === '_id' ? 'ID' : c === 'createdAt' ? 'Tarih' : (
                          survey.items.find((i) => i.id === c)?.title || c
                        )}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {answers.map((ans, index) => (
                  <tr
                    key={ans._id}
                    className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(ans._id)}
                        onChange={() => toggleRow(ans._id)}
                        className="accent-blue-500"
                      />
                    </td>
                    <td
                      className="sticky z-10 left-0 bg-white p-3 font-medium text-gray-800 truncate max-w-[140px] border-r"
                      title={ans.userName}
                    >
                      {ans.userName}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleViewAnswerSheet(true, ans._id)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 
                      px-3 py-1 rounded-lg flex items-center gap-1 justify-center 
                      transition-all duration-200 border border-blue-100 shadow-sm"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span className="hidden sm:inline">Görüntüle</span>
                      </button>
                    </td>
                    {visibleColumns
                      .map((c) => (
                        <td key={c} className="p-3 align-top">
                          {renderAnswerValue(c, ans)}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerTable;

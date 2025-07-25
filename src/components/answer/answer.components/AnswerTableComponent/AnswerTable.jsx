import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AnswerTable = ({ survey, answers, visibleColumns, onDelete, answerDelete }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const toggleRow = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(answers.map(a => a._id));
    }
    setAllSelected(prev => !prev);
  };

  const handleDelete = async () => {
    if (selected.length === 0) return;
    try {
      await answerDelete(selected);
      toast.success('Silindi');
      onDelete(selected);
      setSelected([]);
      setAllSelected(false);
    } catch {
      toast.error('Silme hatası');
    }
  };

  const renderValue = (itemId, ans) => {
    const a = ans.answers.find(x => x.itemId === itemId);
    if (!a) return '';
    const v = a.value;
    return Array.isArray(v) ? v.join(', ') : v ?? '';
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="mb-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        disabled={!selected.length}
      >
        Seçilenleri Sil ({selected.length})
      </button>

      <div className="overflow-x-auto border rounded-2xl shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="accent-blue-500"
                />
              </th>
              {visibleColumns.map(c => (
                <th key={c} className="p-3 text-left whitespace-nowrap font-semibold">
                  {c === '_id'
                    ? 'ID'
                    : c === 'createdAt'
                      ? 'Tarih'
                      : survey.items.find(i => i.id === c)?.title || c}
                </th>
              ))}
              <th className="p-3 text-center">Cevap Kağıdı</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((ans, index) => (
              <tr
                key={ans._id}
                className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(ans._id)}
                    onChange={() => toggleRow(ans._id)}
                    className="accent-blue-500"
                  />
                </td>
                {visibleColumns.map(c => (
                  <td key={c} className="p-3 align-top break-words max-w-xs">
                    {c === '_id'
                      ? ans._id
                      : c === 'createdAt'
                        ? new Date(ans.createdAt).toLocaleString()
                        : (() => {
                          const val = renderValue(c, ans);
                          if (typeof val === 'object' && val !== null) return JSON.stringify(val);
                          return val || '-';
                        })()}
                  </td>
                ))}
                <td className="p-3 text-center">
                  <button
                    onClick={() => navigate(`/cevap-kagidi/${ans._id}`)}
                    className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 justify-center"
                  >
                    <FaExternalLinkAlt />
                    <span className="hidden sm:inline">Görüntüle</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerTable;

import React from 'react';

const ColumnToggler = ({ columns, visibleColumns, setVisibleColumns }) => {
  const toggleColumn = (key) => {
    if (visibleColumns.includes(key)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== key));
    } else {
      setVisibleColumns([...visibleColumns, key]);
    }
  };

  return (
    <div className="my-6 p-4 border border-gray-200 rounded-2xl shadow-sm bg-white max-w-4xl mx-auto">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Sütunları Göster / Gizle</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {columns.map((col) => (
          <label
            key={col.key}
            className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
          >
            <input
              type="checkbox"
              checked={visibleColumns.includes(col.key)}
              onChange={() => toggleColumn(col.key)}
              className="accent-blue-500 w-4 h-4"
            />
            <span>{col.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColumnToggler;

import React from 'react';

export default function Matris({ title, helpText, data, id, value = {}, onChange, allowCustomValue = false, count , SurveyNumberVisible}) {
  const handleChange = (rowLabel, selectedColumn) => {
    onChange({
      ...value,
      [rowLabel]: selectedColumn,
    });
  };

  const handleInputChange = (rowLabel, columnLabel, inputValue) => {
    onChange({
      ...value,
      [rowLabel]: {
        ...(value[rowLabel] && typeof value[rowLabel] === 'object' ? value[rowLabel] : {}),
        [columnLabel]: inputValue,
      },
    });
  };

  return (
    <div className={`p-6 rounded-lg  ${title ? "border-neutral-light bg-neutral-white shadow-lg border" : ""}`}>
      {title ? (
        <>
          <h4 className="font-bold text-2xl text-primary-darktext mb-2">
            {count && title === "" ? `${count}. Soru ${title}` :
              count && title !== "" ? `${count}. ${title}` :
                !count && title ? title : null}
          </h4>
          <p className="text-sm text-neutral-dark mb-6">{helpText}</p>

          {/* Masaüstü tablosu */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-light border border-neutral-light rounded-lg overflow-hidden">
              <thead className="bg-neutral-light">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-darkest uppercase tracking-wider"></th>
                  {data.columns.map((col, idx) => (
                    <th key={idx} className="px-4 py-3 text-center text-xs font-medium text-neutral-darkest uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-neutral-white divide-y divide-neutral-light">
                {data.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-neutral-light/50 transition-colors duration-150">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary-darktext">{row}</td>
                    {data.columns.map((col, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 whitespace-nowrap text-center">
                        {allowCustomValue ? (
                          <input
                            type="text"
                            value={value?.[row]?.[col] || ""}
                            onChange={(e) => handleInputChange(row, col, e.target.value)}
                            className="block w-full px-2 py-1 border border-neutral-DEFAULT rounded-md shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm transition-colors duration-150"
                            placeholder="Değer girin"
                          />
                        ) : (
                          <input
                            type="radio"
                            name={`${id}-${rIdx}`}
                            value={col}
                            checked={value?.[row] === col}
                            onChange={() => handleChange(row, col)}
                            className="form-radio h-4 w-4 text-primary-DEFAULT border-neutral-DEFAULT focus:ring-primary-light cursor-pointer"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil görünüm */}
          <div className="block md:hidden space-y-4 overflow-x-scroll w-full h-[320px]">
            {data.rows.map((row, rIdx) => (
              <div key={rIdx} className="border border-neutral-light rounded-lg p-4 shadow-sm w-full">
                <p className="font-semibold text-sm mb-3 text-primary-darktext break-words">{row}</p>
                <div className="space-y-2">
                  {data.columns.map((col, cIdx) => (
                    <label
                      key={cIdx}
                      className="flex items-center justify-between text-sm text-neutral-dark bg-neutral-light rounded-md px-3 py-2"
                    >
                      <span className="w-1/2 break-words">{col}</span>
                      {allowCustomValue ? (
                        <input
                          type="text"
                          value={value?.[row]?.[col] || ""}
                          onChange={(e) => handleInputChange(row, col, e.target.value)}
                          className="ml-2 px-2 py-1 border border-neutral-DEFAULT rounded-md shadow-sm text-sm w-1/2"
                          placeholder="Değer"
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`radio-${rIdx}`} // ← Bu satır çok önemli: her satıra özel radio grubu
                          value={col}
                          checked={value?.[row] === col}
                          onChange={() => handleChange(row, col)}
                          className="form-radio h-4 w-4 text-primary-DEFAULT border-neutral-DEFAULT"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}
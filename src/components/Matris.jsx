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
          <h4 className="tw-font-bold tw-text-2xl tw-text-primary-darktext tw-mb-2">
            {count && title === "" ? `${count}. Soru ${title}` :
              count && title !== "" ? `${count}. ${title}` :
                !count && title ? title : null}
          </h4>
          <p className="tw-text-sm tw-text-neutral-dark tw-mb-6">{helpText}</p>

          {/* Masaüstü tablosu */}
          <div className="tw-hidden tw-md:block tw-overflow-x-auto">
            <table className="tw-min-w-full tw-divide-y tw-divide-neutral-light tw-border tw-border-neutral-light tw-rounded-lg tw-overflow-hidden">
              <thead className="tw-bg-neutral-light">
                <tr>
                  <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-neutral-darkest tw-uppercase tw-tracking-wider"></th>
                  {data.columns.map((col, idx) => (
                    <th key={idx} className="tw-px-4 tw-py-3 tw-text-center tw-text-xs tw-font-medium tw-text-neutral-darkest tw-uppercase tw-tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tw-bg-neutral-white tw-divide-y tw-divide-neutral-light">
                {data.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="tw-hover:bg-neutral-light/50 tw-transition-colors tw-duration-150">
                    <td className="tw-px-4 tw-py-3 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-primary-darktext">{row}</td>
                    {data.columns.map((col, cIdx) => (
                      <td key={cIdx} className="tw-px-4 tw-py-3 tw-whitespace-nowrap tw-text-center">
                        {allowCustomValue ? (
                          <input
                            type="text"
                            value={value?.[row]?.[col] || ""}
                            onChange={(e) => handleInputChange(row, col, e.target.value)}
                            className="tw-block tw-w-full tw-px-2 tw-py-1 tw-border tw-border-neutral-DEFAULT tw-rounded-md tw-shadow-sm tw-focus:outline-none tw-focus:ring-primary-DEFAULT tw-focus:border-primary-DEFAULT tw-sm:text-sm tw-transition-colors tw-duration-150"
                            placeholder="Değer girin"
                          />
                        ) : (
                          <input
                            type="radio"
                            name={`${id}-${rIdx}`}
                            value={col}
                            checked={value?.[row] === col}
                            onChange={() => handleChange(row, col)}
                            className="tw-form-radio tw-h-4 tw-w-4 tw-text-primary-DEFAULT tw-border-neutral-DEFAULT tw-focus:ring-primary-light tw-cursor-pointer"
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
          <div className="tw-block tw-md:hidden tw-space-y-4 tw-overflow-x-scroll tw-w-full tw-h-[320px]">
            {data.rows.map((row, rIdx) => (
              <div key={rIdx} className="tw-border tw-border-neutral-light tw-rounded-lg tw-p-4 tw-shadow-sm tw-w-full">
                <p className="tw-font-semibold tw-text-sm tw-mb-3 tw-text-primary-darktext tw-break-words">{row}</p>
                <div className="tw-space-y-2">
                  {data.columns.map((col, cIdx) => (
                    <label
                      key={cIdx}
                      className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-text-neutral-dark tw-bg-neutral-light tw-rounded-md tw-px-3 tw-py-2"
                    >
                      <span className="tw-w-1/2 tw-break-words">{col}</span>
                      {allowCustomValue ? (
                        <input
                          type="text"
                          value={value?.[row]?.[col] || ""}
                          onChange={(e) => handleInputChange(row, col, e.target.value)}
                          className="tw-ml-2 tw-px-2 tw-py-1 tw-border tw-border-neutral-DEFAULT tw-rounded-md tw-shadow-sm tw-text-sm tw-w-1/2"
                          placeholder="Değer"
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`radio-${rIdx}`} // ← Bu satır çok önemli: her satıra özel radio grubu
                          value={col}
                          checked={value?.[row] === col}
                          onChange={() => handleChange(row, col)}
                          className="tw-form-radio tw-h-4 tw-w-4 tw-text-primary-DEFAULT tw-border-neutral-DEFAULT"
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
        <div className="tw-flex tw-justify-center tw-items-center">
          <h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function MultipleChoice({
  title,
  helpText,
  options = [],
  allowCustomOption,
  value,
  onChange,
  count,
  SurveyNumberVisible,
  HorizontalDesign,
  MultiselectActive,
  MultiSelectLimit,
  fixedOptions = [], // Hepsi / Hiçbiri buraya eklenmiş
  allowCustomText,
}) {
  const isMulti = !!MultiselectActive;

  const actualValue = isMulti ? (Array.isArray(value) ? value : []) : value;
  const [customOption, setCustomOption] = useState(
    !isMulti && typeof value === "string" ? value : "",
  );

  // Custom option input handler
  const handleCustomOptionChange = (e) => {
    setCustomOption(e.target.value);
    if (!isMulti) onChange(e.target.value);
  };

  const handleSelect = (opt) => {
    if (!isMulti) {
      onChange(opt);
      setCustomOption("");
      return;
    }

    let selected = Array.isArray(value) ? [...value] : [];

    // Fixed options (Hepsi / Hiçbiri) mantığı
    if (fixedOptions.includes(opt)) {
      if (opt === "Hiçbiri") {
        onChange([]);
        toast.dismiss();
        return;
      }
      if (opt === "Hepsi") {
        const allSelected = options.every((o) => selected.includes(o));
        if (allSelected) {
          // Hepsi zaten seçiliyse kaldır
          onChange(selected.filter((v) => !options.includes(v)));
        } else {
          // Seçili olmayanları ekle + Hepsi
          onChange([
            ...new Set([
              ...selected.filter((v) => v !== "Hepsi"),
              ...options,
              "Hepsi",
            ]),
          ]);
        }
        return;
      }
    }

    // Normal seçenekler
    selected = selected.filter((v) => !fixedOptions.includes(v)); // Hepsi/Hiçbiri temizle

    if (selected.includes(opt)) {
      selected = selected.filter((v) => v !== opt);
    } else {
      if (MultiSelectLimit > 0 && selected.length >= MultiSelectLimit) return;
      selected.push(opt);
    }

    onChange(selected);
  };

  const buttonBaseClasses =
    "cursor-pointer px-5 py-1 rounded-lg text-lg select-none transition-colors duration-200 border";

  const selectedClasses = "bg-primary text-white border-primary";
  const unselectedClasses =
    "bg-neutral border-neutral-dark hover:bg-neutral-dark";

  const containerClasses = HorizontalDesign
    ? "flex flex-wrap gap-4"
    : "flex flex-col gap-3";

  return (
    <div>
      {title ? (
        <>
          <label className="font-semibold text-primary-text mb-2 block">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
            {isMulti && (
              <span className="text-sm text-primary-text ml-2">
                Birden fazla seçebilirsin
                {MultiSelectLimit > 0 && ` (Seçim limiti: ${MultiSelectLimit})`}
              </span>
            )}
          </label>
          {helpText && <p className="text-sm text-neutral mb-5">{helpText}</p>}

          <div className={containerClasses}>
            {/* Normal seçenekler */}
            {options.map((opt, idx) => {
              const isSelected = actualValue?.includes(opt);
              return (
                <div
                  key={idx}
                  className={`${buttonBaseClasses} ${
                    isSelected ? selectedClasses : unselectedClasses
                  }`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </div>
              );
            })}

            {/* Fixed seçenekler: Hepsi / Hiçbiri */}
            {fixedOptions.map((opt, idx) => {
              const isSelected = actualValue?.includes(opt);
              return (
                <div
                  key={`fixed-${idx}`}
                  className={`${buttonBaseClasses} ${
                    isSelected ? selectedClasses : unselectedClasses
                  }`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </div>
              );
            })}

            {/* Custom option */}
            {allowCustomOption && (
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  className={`${buttonBaseClasses} ${
                    customOption ? selectedClasses : unselectedClasses
                  } border-neutral-dark text-black bg-neutral placeholder:text-neutral-dark p-2 w-48`}
                  placeholder={allowCustomText || "Diğer..."}
                  value={customOption}
                  onChange={handleCustomOptionChange}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.target.select()}
                />
              </div>
            )}
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

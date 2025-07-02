import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // toast ekle

export default function MultipleChoice({
  title,
  helpText,
  options = [],
  allowCustomOption,
  id,
  value,
  onChange,
  count,
  SurveyNumberVisible,
  HorizontalDesign,
  MultiselectActive,
  MultiSelectLimit,
  fixedOptions = [] // default olarak boş dizi
}) {
  const isMulti = !!MultiselectActive;

  // value çoklu seçimde dizi, tek seçimde string/null olabilir
  const actualValue = isMulti
    ? Array.isArray(value)
      ? value
      : []
    : value;

  const [customOption, setCustomOption] = useState(
    !isMulti && typeof value === "string" ? value : ""
  );

  // Kullanıcı inputa yazdıkça customOption ve onChange güncellenir
  const handleCustomOptionChange = (e) => {
    setCustomOption(e.target.value);
    if (!isMulti) {
      onChange(e.target.value);
    }
  };

  // "Hepsi" ve "Hiçbiri" mantığı
  const handleSelect = (opt) => {
    console.log("Seçilen:", opt);
    let currentValue = isMulti ? (Array.isArray(value) ? [...value] : []) : value;

    // "Hiçbiri" seçildiyse
    if (opt === "Hiçbiri") {
      onChange(["Hiçbiri"]);
      toast.dismiss();
      return;
    }

    // "Hepsi" seçildiyse
    if (opt === "Hepsi") {
      const hasHicbiri = currentValue?.includes("Hiçbiri");

      if (hasHicbiri) {
        // "Hiçbiri" seçiliyse önce temizleyip sonra hepsini seç (tek seferde)
        onChange([...options, "Hepsi"]);
        return;
      }

      // Eğer zaten tümü + Hepsi seçiliyse: kaldır
      const allSelected = options.every((opt) => currentValue?.includes(opt));
      const hasHepsi = currentValue?.includes("Hepsi");

      if (allSelected && hasHepsi) {
        onChange([]);
        return;
      }

      // Değilse hepsini + "Hepsi" seç
      onChange([...options, "Hepsi"]);
      return;
    }

    // Diğer seçimler
    if (isMulti) {
      let selected = Array.isArray(currentValue) ? [...currentValue] : [];

      // "Hiçbiri" ve "Hepsi" varsa çıkar
      selected = selected.filter((v) => v !== "Hiçbiri" && v !== "Hepsi");

      const isSelected = selected.includes(opt);
      if (isSelected) {
        selected = selected.filter((v) => v !== opt);
      } else {
        if (MultiSelectLimit > 0 && selected.length >= MultiSelectLimit) return;
        selected.push(opt);
      }

      onChange(selected);
    } else {
      onChange(opt);
      setCustomOption("");
    }
  };







  // Buton stilleri
  const buttonBaseClasses =
    "cursor-pointer px-5 py-1 rounded-lg text-lg select-none transition-colors duration-200 border";

  const selectedClasses = "bg-primary text-white border-primary";
  const unselectedClasses = "bg-neutral border-neutral-dark hover:bg-neutral-dark";

  // Layout
  const containerClasses = HorizontalDesign
    ? "flex flex-wrap gap-4"
    : "flex flex-col gap-3";

  // "Hepsi" Seçeneğini fixedOptions'a Dahil Et
  const allOptions = [
    ...options,
    ...((fixedOptions || []).filter((opt) => !(isMulti && opt === "Hepsi")))
  ];


  // "Hepsi" Seçeneği Eklenmeli mi?
  const isAllSelected = options.length > 0 && options.every(opt => actualValue?.includes(opt));

  useEffect(() => {
    if (!isMulti) return;

    const val = Array.isArray(value) ? value : [];
    const allSelected = options.every((opt) => val.includes(opt));

    if (val.includes("Hepsi") && !allSelected) {
      onChange(val.filter((v) => v !== "Hepsi"));
    }
  }, [value, options]);






  // "Hepsi" seçeneği render edildiğinde, onun da seçili görünmesi için kontrol yapalım
  const allOptionsIncludingHepsi =
    isAllSelected && !actualValue.includes("Hepsi")
      ? [...allOptions, "Hepsi"]
      : allOptions;


  return (
    <div>
      {title ? (
        <>
          <label className="tw-font-semibold tw-text-primary-text tw-mb-2 tw-block">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
            {isMulti && (
              <span className="tw-text-sm tw-text-primary-text tw-ml-2">
                Birden fazla seçebilirsin
                {MultiSelectLimit > 0 && ` (Seçim limiti: ${MultiSelectLimit})`}
              </span>
            )}
          </label>
          {helpText && <p className="tw-text-sm tw-text-neutral tw-mb-5">{helpText}</p>}
          <div className={containerClasses}>
            {/* Options */}
            {allOptionsIncludingHepsi.map((opt, idx) => {
              const isSelected = actualValue?.includes(opt);
              const isHiçbiriSelected = actualValue?.includes("Hiçbiri");
              return (
                <div
                  key={idx}
                  className={`${buttonBaseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </div>
              );
            })}

            {/* Custom Option */}
            {allowCustomOption && (
              <div className="tw-flex tw-items-center tw-gap-2 tw-mt-4">
                <input
                  type="text"
                  className={`${buttonBaseClasses} ${customOption ? selectedClasses : unselectedClasses} border-neutral-dark text-black bg-neutral placeholder:text-neutral-dark p-2 w-48`}
                  placeholder="Diğer..."
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
        <div className="tw-flex tw-justify-center tw-items-center">
          <h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}

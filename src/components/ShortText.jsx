import React from "react";

export default function ShortText({
  title,
  helpText,
  id,
  value,
  onChange,
  count,
  SurveyNumberVisible,
  inputType,
  charLimit = 0, // sadece serbest metin için geçerli
}) {
  const inputTitleSuffix = {
    tel: " (Telefon Numarası Girişi)",
    date: " (Tarih Girişi)",
    tc: " (TC Kimlik No Girişi)",
    zip: " (Posta Kodu Girişi)",
    text: charLimit > 0 ? ` (Maks. ${charLimit} karakter)` : " (Serbest Metin)",
  };

  // Telefon numarası için basit format fonksiyonu
  const formatPhoneNumber = (num) => {
    const digits = num.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6)
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  };

  // Serbest metin için kalan karakter sayısı
  const remainingChars =
    inputType === "text" && charLimit > 0
      ? charLimit - (value?.length || 0)
      : null;

  const handleChange = (e) => {
    let val = e.target.value;

    if (inputType === "text") {
      if (charLimit === 0 || val.length <= charLimit) {
        onChange(val);
      }
    } else if (["tel", "tc", "zip"].includes(inputType)) {
      // Sadece rakam al ve 11 haneye sınırla
      let digits = val.replace(/\D/g, "");
      if (inputType === "tc" || inputType === "zip") {
        digits = digits.slice(0, maxLength);
        onChange(digits);
      } else if (inputType === "tel") {
        digits = digits.slice(0, 11); // Telefon numarası en fazla 11 hane
        val = formatPhoneNumber(digits);
        onChange(val);
      }
    } else {
      onChange(val);
    }
  };
  
  // maxLength sabit sayısallar için, serbest metin için charLimit kullanılıyor
  const maxLength =
    inputType === "text"
      ? charLimit > 0
        ? charLimit
        : undefined
      : inputType === "tc"
        ? 11
        : inputType === "tel"
          ? 15 // Format karakterleri için daha yüksek limit
          : inputType === "zip"
            ? 5
            : undefined;

  return (
    <div className="tw-p-4">
      {title ? (
        <>
          <label htmlFor={id} className="tw-font-semibold tw-text-primary-text">
            {SurveyNumberVisible
              ? count
                ? `${count}. ${title}${inputTitleSuffix[inputType] || ""}`
                : `${title}${inputTitleSuffix[inputType] || ""}`
              : `${title}${inputTitleSuffix[inputType] || ""}`}
          </label>
          <p className="tw-text-sm tw-text-neutral tw-mb-2">{helpText}</p>

          <input
            id={id}
            name={id}
            type={inputType === "tc" || inputType === "zip" ? "text" : inputType}
            className="tw-border tw-border-success tw-bg-neutral tw-outline-none tw-rounded-xl tw-p-2 tw-w-full"
            value={value || ""}
            inputMode={["tel", "tc", "zip"].includes(inputType) ? "numeric" : "text"}
            onChange={handleChange}
            maxLength={maxLength}
            pattern={["tel", "tc", "zip"].includes(inputType) ? "\\d*" : undefined}
          />
          {remainingChars !== null && (
            <p className="tw-text-xs tw-text-right tw-text-gray-500 tw-mt-1">
              {remainingChars} karakter kaldı
            </p>
          )}
        </>
      ) : (
        <div className="tw-flex tw-justify-center tw-items-center">
          <h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}

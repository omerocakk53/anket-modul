import { useState, useEffect } from "react";

export default function Numeric({
  title,
  helpText,
  id,
  value,
  onChange,
  count,
  SurveyNumberVisible,
  allowDecimal = false,
  charLimit = 0,
  thousandSeparator = false,
}) {
  const [showWarning, setShowWarning] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  // inputu formatlayıp gösterirken binlik ayırıcı uygularız
  const formatValue = (val) => {
    if (!val) return "";
    // sayısal değeri parçala (ondalık varsa)
    const parts = val.toString().split(".");
    let integerPart = parts[0].replace(/\D/g, ""); // sadece rakamları al (ondalık nokta dahil değil)
    if (thousandSeparator) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    if (allowDecimal && parts.length > 1) {
      // ondalık varsa sadece ilk kısmı ekle
      return integerPart + "." + parts[1].replace(/\D/g, "");
    }
    return integerPart;
  };

  // inputa kullanıcı her yazdığında burası çalışır
  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Binlik ayırıcı kaldır
    if (thousandSeparator) {
      inputValue = inputValue.replace(/,/g, "");
    }

    // Karakter sınırı kontrolü (charLimit > 0 ise)
    if (charLimit > 0 && inputValue.length > charLimit) {
      inputValue = inputValue.slice(0, charLimit);
    }

    // Regex kontrol
    const regex = allowDecimal ? /^(\d+)?(\.)?(\d*)?$/ : /^\d*$/;

    if (inputValue === "" || regex.test(inputValue)) {
      setShowWarning(false);
      setDisplayValue(formatValue(inputValue));
      onChange(inputValue);
    } else {
      setShowWarning(true);
    }
  };

  // dışarıdan gelen value değiştiğinde displayValue'yi güncelle
  useEffect(() => {
    setDisplayValue(formatValue(value || ""));
  }, [value, allowDecimal, thousandSeparator]);

  return (
    <div className="mb-4">
      {title ? (
        <>
          <label htmlFor={id} className="font-semibold text-primary-text">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
          </label>
          <p className="text-sm mb-2 text-neutral">{helpText}</p>
          <input
            type="text"
            inputMode="decimal"
            id={id}
            name={id}
            placeholder="Sadece Sayısal Değer"
            className={
              showWarning
                ? "outline-none rounded-xl p-2 w-full border border-danger bg-neutral"
                : "outline-none rounded-xl p-2 w-full border border-success bg-neutral"
            }
            value={displayValue}
            onChange={handleChange}
            maxLength={
              charLimit > 0
                ? charLimit +
                  (thousandSeparator ? Math.floor(charLimit / 3) : 0)
                : undefined
            }
            // maxLength'e ekstra olarak binlik ayırıcı karakterlerini ekledik (tam tamına değil ama kabaca)
          />
          {charLimit > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Karakter sınırı: {charLimit}
            </p>
          )}
          {showWarning && (
            <p className="text-sm text-red-600 mt-1">
              Lütfen sadece geçerli sayısal değer giriniz.
            </p>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}

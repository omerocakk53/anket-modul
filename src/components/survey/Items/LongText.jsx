export default function LongText({
  title,
  helpText,
  id,
  value,
  onChange,
  count,
  SurveyNumberVisible,
  charLimit,
}) {
  // Kalan karakter sayısını hesapla
  const remainingChars =
    charLimit > 0 ? charLimit - (value?.length || 0) : null;

  // Change handler: charLimit varsa sınırlı değiştir
  const handleChange = (e) => {
    let val = e.target.value;
    if (charLimit > 0 && val.length > charLimit) {
      val = val.slice(0, charLimit);
    }
    onChange(val);
  };

  return (
    <div>
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
          <p className="text-sm mb-1 text-neutral">{helpText}</p>

          <textarea
            id={id}
            name={id}
            className="border border-success bg-neutral rounded-xl p-2 w-full outline-none"
            rows="4"
            value={value || ""}
            onChange={handleChange}
          />
          {charLimit > 0 && (
            <p className="text-xs text-right text-gray-500 mt-1">
              {remainingChars} karakter kaldı
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

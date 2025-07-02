export default function LongText({
  title,
  helpText,
  id,
  value,
  onChange,
  count,
  SurveyNumberVisible,
  charLimit
}) {
  // Kalan karakter sayısını hesapla
  const remainingChars = charLimit > 0 ? charLimit - (value?.length || 0) : null;

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
          <label htmlFor={id} className="tw-font-semibold tw-text-primary-text">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
          </label>
          <p className="tw-text-sm tw-mb-1 tw-text-neutral">{helpText}</p>

          <textarea
            id={id}
            name={id}
            className="tw-border tw-border-success tw-bg-neutral tw-rounded-xl tw-p-2 tw-w-full tw-outline-none"
            rows="4"
            value={value || ""}
            onChange={handleChange}
          />
          {charLimit > 0 && (
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

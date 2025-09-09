export default function Dropdown({
  title,
  helpText,
  options = [],
  id,
  value,
  onChange,
  count,
  SurveyNumberVisible,
}) {
  return (
    <div>
      {title ? (
        <>
          {" "}
          <label className="font-semibold text-primary-text">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
          </label>
          <p className="text-sm text-neutral mb-2">{helpText}</p>
          <select
            id={id}
            name={id}
            className="outline-none rounded-xl p-2 w-full border border-success bg-neutral"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1>
          </div>
        </>
      )}
    </div>
  );
}

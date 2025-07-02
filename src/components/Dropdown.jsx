
export default function Dropdown({ title, helpText, options = [], id, value, onChange, count, SurveyNumberVisible }) {
  return (
    <div>
      {title ? (<>  <label className="tw-font-semibold tw-text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</label>
        <p className="tw-text-sm tw-text-neutral tw-mb-2">{helpText}</p>
        <select
          id={id}
          name={id}
          className="tw-outline-none tw-rounded-xl tw-p-2 tw-w-full tw-border tw-border-success tw-bg-neutral"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Seçiniz</option>
          {options.map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))}
        </select></>) : (<><div className="tw-flex tw-justify-center tw-items-center"><h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
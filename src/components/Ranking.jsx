export default function Ranking({ title, helpText, options = [], count , SurveyNumberVisible}) {
  return (
    <div>
      {title ? (<>    <label className="tw-font-semibold tw-text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</label>
        <p className="tw-text-sm tw-text-neutral">{helpText}</p>
        <ol className="tw-list-decimal tw-ml-6 tw-space-y-1 tw-">
          {options.map((opt, idx) => (
            <li key={idx} className="tw-border-0 tw-border-b-[1px] tw-border-primary-light tw-p-2 tw-text-primary-text">{opt}</li>
          ))}
        </ol></>) : (<><div className="tw-flex tw-justify-center tw-items-center"><h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
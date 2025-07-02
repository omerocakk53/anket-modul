export default function Payment({ title, helpText, amount, count, SurveyNumberVisible, currency }) {
  return (
    <div className="tw-p-4">
      {title ? (<> <h4 className="tw-font-semibold tw-text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</h4>
        <p className="tw-text-sm tw-text-neutral">{helpText}</p>
        <p className="tw-mt-2 tw-font-bold tw-text-primary-text">Tutar: <strong className="tw-text-secondary-dark">{amount} {currency}</strong></p></>) : (<><div className="tw-flex tw-justify-center tw-items-center"><h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
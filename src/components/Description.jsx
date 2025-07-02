export default function Description({ title, helpText, count, SurveyNumberVisible }) {
  return (
    <div className="tw-p-4 tw-rounded tw-text-center tw-gap-2 tw-text-primary-text">
      {title ? (<>  <h1 className="tw-text-3xl tw-font-bold tw-mb-5">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</h1>
        <p className="tw-text-xl tw-text-neutral">{helpText}</p></>) : (<><div className="tw-flex tw-justify-center tw-items-center"><h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
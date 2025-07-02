export default function Link({ title, helpText, url, count , SurveyNumberVisible}) {
  return (
    <div>
      {title ? (<>  <h4 className="tw-font-bold tw-text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</h4>
        <p className="tw-text-sm tw-text-neutral tw-mb-5">{helpText}</p>
        <a href={url} target="_blank" className="tw-text-primary tw-hover:underline tw-hover:text-primary-light">{url}</a></>) : (<><div className="tw-flex tw-justify-center tw-items-center"><h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
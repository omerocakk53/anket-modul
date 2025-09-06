export default function Link({
  title,
  helpText,
  url,
  count,
  SurveyNumberVisible,
}) {
  return (
    <div>
      {title ? (
        <>
          {" "}
          <h4 className="font-bold text-primary-text">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
          </h4>
          <p className="text-sm text-neutral mb-5">{helpText}</p>
          <a
            href={url}
            target="_blank"
            className="text-primary hover:underline hover:text-primary-light"
            rel="noreferrer"
          >
            {url}
          </a>
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

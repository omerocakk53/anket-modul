export default function Description({ title, helpText, count, SurveyNumberVisible }) {
  return (
    <div className="p-4 rounded text-center gap-2 text-primary-text">
      {title ? (<>  <h1 className="text-3xl font-bold mb-5">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</h1>
        <p className="text-xl text-neutral">{helpText}</p></>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
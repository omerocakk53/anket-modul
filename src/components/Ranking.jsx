export default function Ranking({ title, helpText, options = [], count , SurveyNumberVisible}) {
  return (
    <div>
      {title ? (<>    <label className="font-semibold text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</label>
        <p className="text-sm text-neutral">{helpText}</p>
        <ol className="list-decimal ml-6 space-y-1 ">
          {options.map((opt, idx) => (
            <li key={idx} className="border-0 border-b-[1px] border-primary-light p-2 text-primary-text">{opt}</li>
          ))}
        </ol></>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
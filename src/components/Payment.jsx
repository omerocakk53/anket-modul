export default function Payment({ title, helpText, amount, count, SurveyNumberVisible, currency }) {
  return (
    <div className="p-4">
      {title ? (<> <h4 className="font-semibold text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</h4>
        <p className="text-sm text-neutral">{helpText}</p>
        <p className="mt-2 font-bold text-primary-text">Tutar: <strong className="text-secondary-dark">{amount} {currency}</strong></p></>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
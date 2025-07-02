export default function QuestionGroup({ title, helpText, questions = [], id, value = {}, onChange, count , SurveyNumberVisible}) {
  const handleChange = (questionLabel, inputValue) => {
    onChange({
      ...value,
      [questionLabel]: inputValue
    });
  };

  return (
    <div className="tw-p-4 tw-space-y-4">
      {title ? (<>   <h4 className="tw-font-bold tw-text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</h4>
        <p className="tw-text-sm tw-text-neutral">{helpText}</p>
        {questions.map((q, idx) => (
          <div key={idx}>
            <label className="tw-block tw-font-medium tw-mb-1 tw-text-primary-text">{q}</label>
            <input
              type="text"
              placeholder="Soru Cevabınız ?"
              className="tw-p-2 tw-w-full tw-rounded-lg tw-outline-none tw-border tw-border-success tw-bg-neutral"
              value={value?.[q] || ""}
              onChange={(e) => handleChange(q, e.target.value)}
            />
          </div>
        ))}</>) : (<><div className="tw-flex tw-justify-center tw-items-center"><h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}

export default function QuestionGroup({
  title,
  helpText,
  questions = [],
  id,
  value = {},
  onChange,
  count,
  SurveyNumberVisible,
}) {
  const handleChange = (questionLabel, inputValue) => {
    onChange({
      ...value,
      [questionLabel]: inputValue,
    });
  };

  return (
    <div className="p-4 space-y-4">
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
          <p className="text-sm text-neutral">{helpText}</p>
          {questions.map((q, idx) => (
            <div key={idx}>
              <label className="block font-medium mb-1 text-primary-text">
                {q}
              </label>
              <input
                type="text"
                placeholder="Soru Cevabınız ?"
                className="p-2 w-full rounded-lg outline-none border border-success bg-neutral"
                value={value?.[q] || ""}
                onChange={(e) => handleChange(q, e.target.value)}
              />
            </div>
          ))}
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

import { useState, useEffect } from "react";

export default function Email({ title, helpText, id, value, onChange, count , SurveyNumberVisible}) {
  const [error, setError] = useState("");

  // E-posta doğrulama fonksiyonu
  const validateEmail = (val) => {
    if (!val) {
      return "E-posta zorunludur.";
    }
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(val)) {
      return "Geçerli bir e-posta girin.";
    }
    return "";
  };

  // input değiştiğinde kontrol et ve sadece geçerli ise onChange'i çağır
  const handleChange = (val) => {
    const validationError = validateEmail(val);
    setError(validationError);

    if (!validationError) {
      onChange(val);
    } else {
      // Geçersizse onChange'e undefined veya boş gönderelim (isteğe bağlı)
      onChange(undefined);
    }
  };

  // dışarıdan value değişirse hatayı tekrar kontrol et
  useEffect(() => {
    setError(validateEmail(value));
  }, [value]);

  return (
    <div>
      {title ? (<>  <label htmlFor={id} className="font-semibold text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</label>
        <p className="text-sm text-neutral mb-2">{helpText}</p>
        <input
          id={id}
          name={id}
          type="email"
          className={`border outline-none rounded-xl p-2 w-full  bg-neutral ${error ? "border-danger" : "border-success"}`}
          placeholder="Sadece E-posta"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => setError(validateEmail(value))}
          required
        />
        {error && <p className="text-danger text-sm mt-1">{error}</p>}</>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}

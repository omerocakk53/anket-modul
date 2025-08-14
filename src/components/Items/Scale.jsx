export default function Scale({ title, helpText, data, id, value = null, onChange, count , SurveyNumberVisible}) {
  const min = data.min;
  const max = data.max;
  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  // Function to determine the score category (low, medium, high)
  const getScoreCategory = (score) => {
    const totalRange = max - min;
    const lowThreshold = min + totalRange * 0.33; // Bottom 33%
    const highThreshold = min + totalRange * 0.67; // Top 33%

    if (score >= highThreshold) {
      return "high";
    } else if (score <= lowThreshold) {
      return "low";
    } else {
      return "medium";
    }
  };

  // Function to get dynamic classes based on category
  const getCategoryClasses = (score) => {
    if (value === score) {
      const category = getScoreCategory(score);
      switch (category) {
        case "low":
          return "bg-danger text-primary-text"; // Example colors for low
        case "medium":
          return "bg-warning text-primary-text"; // Example colors for medium
        case "high":
          return "bg-secondary text-primary-text"; // Example colors for high
        default:
          return "bg-secondary-light text-primary-text";
      }
    } else {
      return "bg-neutral-light text-primary-darktext hover:bg-secondary-light hover:text-primary-text";
    }
  };

  return (
    <div className="p-4">
      {title ? (<>  <label className="font-semibold text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</label>
        <p className="text-sm text-neutral mb-2">{helpText}</p>
        <div className="flex gap-1 p-1 rounded-lg">
          {range.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={`w-10 h-10 rounded-lg text-black font-medium transition ${getCategoryClasses(num)}`}
            >
              {num}
            </button>
          ))}
        </div></>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
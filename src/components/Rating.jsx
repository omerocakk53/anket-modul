import { useState } from "react";
import { FaStar, FaHeart, FaThumbsUp } from 'react-icons/fa'; // Yıldız, Kalp ve Ok simgeleri
export default function Rating({ title, helpText, maxValue = 5, id, value = 0, onChange, count, SurveyNumberVisible, selectedIcon }) {
  const [hovered, setHovered] = useState(0);

  // Function to determine the rating category (low, medium, high)
  const getRatingCategory = (currentValue) => {
    if (maxValue === 0) return "none"; // Avoid division by zero

    const lowThreshold = maxValue * 0.33; // Bottom 33%
    const highThreshold = maxValue * 0.67; // Top 33%

    if (currentValue >= highThreshold) {
      return "high";
    } else if (currentValue <= lowThreshold && currentValue > 0) { // Ensure it's not 0 for low
      return "low";
    } else if (currentValue > lowThreshold && currentValue < highThreshold) {
      return "medium";
    } else {
      return "none"; // When value is 0 (no selection)
    }
  };

  // Function to get dynamic text color classes based on category
  const getCategoryTextColor = (currentValue) => {
    const category = getRatingCategory(currentValue);
    switch (category) {
      case "low":
        return "text-danger"; // Example color for low rating
      case "medium":
        return "text-warning"; // Example color for medium rating
      case "high":
        return "text-secondary"; // Example color for high rating
      default:
        return "text-primary-text"; // Default color when no specific category
    }
  };

  return (
    <div className="p-4">
      {title ? (<>  <label className="block font-semibold text-primary-text">{
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }</label>
        <p className="text-sm text-neutral mb-2">{helpText}</p>
        <div className="flex gap-1 text-2xl">
          {[...Array(maxValue)].map((_, idx) => {
            const rating = idx + 1;
            const isFilled = rating <= (hovered || value);
            const categoryColorClass = getCategoryTextColor(value); // Get color based on current value

            return (
              <span
                key={idx}
                onClick={() => onChange(rating)}
                onMouseEnter={() => setHovered(rating)}
                onMouseLeave={() => setHovered(0)}
                className={`cursor-pointer transition-colors ${isFilled ? (value > 0 ? categoryColorClass : "text-warning") : "text-primary-text"
                  }`}
              >
                {selectedIcon == "star" ? <FaStar size={20} /> : selectedIcon == "heart" ? <FaHeart size={20} /> : selectedIcon == "thumb" ? <FaThumbsUp size={20} /> : null}
              </span>
            );
          })}
        </div></>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
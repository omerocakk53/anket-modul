import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast' // toast ekle

export default function ImageChoice({
  title,
  helpText,
  images,
  id,
  onChange,
  count,
  SurveyNumberVisible,
  Design,
  MultiSelectLimit,
  MultiselectActive,
  imageTitles
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  // Çoklu seçimde, seçim limitini kontrol et
  const handleImageSelect = (idx) => {
    let updatedSelection = [...selectedImages];

    if (MultiselectActive) {
      // Çoklu seçim aktifse
      if (updatedSelection.includes(idx)) {
        // Eğer zaten seçiliyse, seçimden çıkar
        updatedSelection = updatedSelection.filter((item) => item !== idx);
      } else {
        // Eğer limit aşılmamışsa, seçimi ekle
        if (MultiSelectLimit > 0 && updatedSelection.length >= MultiSelectLimit) {
          toast(`Seçim limitine ulaştınız (${MultiSelectLimit} adet seçebilirsiniz).`);
          return;
        }
        updatedSelection.push(idx);
      }
    } else {
      // Tekli seçimse, yalnızca tek bir görsel seçilsin
      updatedSelection = [idx];
    }

    // Seçilen görsellerin URL'lerini veya başlıklarını almak
    const selectedImagesData = updatedSelection.map((selectedIdx) => {
      return {
        idx: selectedIdx,
        title: imageTitles[selectedIdx],  // Başlık bilgisi
        url: images[selectedIdx],  // Görsel URL'si
      };
    });

    // Veri gönderme
    setSelectedImages(updatedSelection);
    onChange(selectedImagesData); // Veriyi düzenlenmiş haliyle gönder
  };


  return (
    <div>
      
      {title ? (
        <>
          <h4 className="font-semibold text-primary-text">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
            {MultiselectActive && (
              <span className="text-sm text-primary-text ml-2">
                Birden fazla seçebilirsin
                {MultiSelectLimit > 0 && ` (Seçim limiti: ${MultiSelectLimit})`}
              </span>
            )}
          </h4>
          <p className="text-sm text-neutral mb-2">{helpText}</p>

          {/* Eğer çoklu seçim aktifse, kutu işaretleme yöntemi kullanılacak */}
          {MultiselectActive ? (
            <div className={`grid grid-cols-2 gap-4 p-2`}>
              {images.map((img, idx) => (
                <label key={idx} className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    name={id}
                    value={idx}
                    onChange={() => handleImageSelect(idx)}
                    className="hidden peer"
                    checked={selectedImages.includes(idx)}
                  />
                  <span className="text-center mt-2 text-sm sm:text-base font-semibold text-primary-text hover:text-primary-dark transition duration-300 ease-in-out">
                    {imageTitles[idx]}
                  </span>
                  <img
                    src={img}
                    alt={`Görsel ${idx + 1}`}
                    className={`object-contain peer-checked:ring-2  cursor-pointer transition duration-300 ease-in-out hover:scale-105 ${Design ? "p-1 ring-primary-text rounded-2xl h-[200px] " : "p-1 ring-primary-text rounded-xl h-[100px]"}`}
                  />
                </label>
              ))}
            </div>
          ) : (
            <div className={`grid grid-cols-2 gap-4 p-2`}>
              {images.map((img, idx) => (
                <label key={idx} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name={id}
                    value={idx}
                    onChange={() => handleImageSelect(idx)}
                    className="hidden peer"
                    checked={selectedImages.includes(idx)}
                  />
                  <span className="text-center mt-2 text-sm sm:text-base font-semibold text-primary-text hover:text-primary-dark transition duration-300 ease-in-out">
                    {imageTitles[idx]}
                  </span>
                  <img
                    src={img}
                    alt={`Görsel ${idx + 1}`}
                    className={` object-contain peer-checked:ring-2  cursor-pointer transition duration-300 ease-in-out hover:scale-105 ${Design ? "p-1 ring-primary-text rounded-2xl h-[200px] " : "p-1 ring-primary-text rounded-xl h-[100px]"}`}
                  />
                </label>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}

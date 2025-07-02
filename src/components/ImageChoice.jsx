import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // toast ekle

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
          toast.info(`Seçim limitine ulaştınız (${MultiSelectLimit} adet seçebilirsiniz).`);
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
          <h4 className="tw-font-semibold tw-text-primary-text">
            {SurveyNumberVisible
              ? count
                ? title === ""
                  ? `${count}. Soru ${title}`
                  : `${count}. ${title}`
                : title || null
              : title || null}
            {MultiselectActive && (
              <span className="tw-text-sm tw-text-primary-text tw-ml-2">
                Birden fazla seçebilirsin
                {MultiSelectLimit > 0 && ` (Seçim limiti: ${MultiSelectLimit})`}
              </span>
            )}
          </h4>
          <p className="tw-text-sm tw-text-neutral tw-mb-2">{helpText}</p>

          {/* Eğer çoklu seçim aktifse, kutu işaretleme yöntemi kullanılacak */}
          {MultiselectActive ? (
            <div className={`grid grid-cols-2 gap-4 p-2`}>
              {images.map((img, idx) => (
                <label key={idx} className="tw-flex tw-flex-col tw-items-center">
                  <input
                    type="checkbox"
                    name={id}
                    value={idx}
                    onChange={() => handleImageSelect(idx)}
                    className="tw-hidden tw-peer"
                    checked={selectedImages.includes(idx)}
                  />
                  <span className="tw-text-center tw-mt-2 tw-text-sm tw-sm:text-base tw-font-semibold tw-text-primary-text tw-hover:text-primary-dark tw-transition tw-duration-300 tw-ease-in-out">
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
                <label key={idx} className="tw-flex tw-flex-col tw-items-center">
                  <input
                    type="radio"
                    name={id}
                    value={idx}
                    onChange={() => handleImageSelect(idx)}
                    className="tw-hidden tw-peer"
                    checked={selectedImages.includes(idx)}
                  />
                  <span className="tw-text-center tw-mt-2 tw-text-sm tw-sm:text-base tw-font-semibold tw-text-primary-text tw-hover:text-primary-dark tw-transition tw-duration-300 tw-ease-in-out">
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
        <div className="tw-flex tw-justify-center tw-items-center">
          <h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}

import React, { useRef } from "react";
import { FiUploadCloud, FiFile, FiXCircle } from "react-icons/fi"; // Importing icons

export default function FileUpload({ title, helpText, value, id, onChange, count , SurveyNumberVisible}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden input
  };

  const handleFileRemove = () => {
    onChange(null); // Clear the selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Also clear the input's value for re-selection
    }
  };

  return (
    <div className="p-4">
      {title ? (<>  <label htmlFor={id} className="font-semibold text-primary-text block mb-1">
        {
        SurveyNumberVisible
          ? (
            count
              ? (title === "" ? `${count}. Soru ${title}` : `${count}. ${title}`)
              : (title || null)
          )
          : (title || null)
      }
      </label>
        <p className="text-sm text-neutral mb-4">{helpText}</p>
        <input
          type="file"
          id={id}
          name={id}
          ref={fileInputRef} // Assign the ref to the input
          onChange={(e) => onChange(e.target.files[0])}
          className="hidden" // Hide the default file input
        />
        {!value ? (
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-primary-light rounded-lg text-primary-text hover:bg-primary-light hover:text-primary-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
          >
            <FiUploadCloud className="mr-2 text-xl" />
            <span>Dosya Seçmek İçin Tıkla veya Sürükle</span>
          </button>
        ) : (
          <div className="flex items-center justify-between p-3 border border-secondary-light rounded-lg bg-secondary-light/30 text-primary-text">
            <div className="flex items-center">
              <FiFile className="mr-2 text-xl text-primary-text" />
              <span className="font-medium text-sm truncate">{value.name}</span>
            </div>
            <button
              type="button"
              onClick={handleFileRemove}
              className="ml-4 text-neutral hover:text-danger transition-colors duration-200"
              title="Dosyayı Kaldır"
            >
              <FiXCircle className="text-xl" />
            </button>
          </div>
        )}
        {value && (
          <p className="text-xs text-neutral mt-2">
            Seçilen dosya: <span className="font-semibold text-secondary-light">{value.name}</span>
          </p>
        )}</>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
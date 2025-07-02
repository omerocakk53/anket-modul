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
    <div className="tw-p-4">
      {title ? (<>  <label htmlFor={id} className="tw-font-semibold tw-text-primary-text tw-block tw-mb-1">
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
        <p className="tw-text-sm tw-text-neutral tw-mb-4">{helpText}</p>
        <input
          type="file"
          id={id}
          name={id}
          ref={fileInputRef} // Assign the ref to the input
          onChange={(e) => onChange(e.target.files[0])}
          className="tw-hidden" // Hide the default file input
        />
        {!value ? (
          <button
            type="button"
            onClick={handleButtonClick}
            className="tw-flex tw-items-center tw-justify-center tw-w-full tw-px-4 tw-py-3 tw-border-2 tw-border-dashed tw-border-primary-light tw-rounded-lg tw-text-primary-text tw-hover:bg-primary-light tw-hover:text-primary-text tw-transition-colors tw-duration-200 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-primary-light tw-focus:ring-opacity-50"
          >
            <FiUploadCloud className="tw-mr-2 tw-text-xl" />
            <span>Dosya Seçmek İçin Tıkla veya Sürükle</span>
          </button>
        ) : (
          <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-border tw-border-secondary-light tw-rounded-lg tw-bg-secondary-light/30 tw-text-primary-text">
            <div className="tw-flex tw-items-center">
              <FiFile className="tw-mr-2 tw-text-xl tw-text-primary-text" />
              <span className="tw-font-medium tw-text-sm tw-truncate">{value.name}</span>
            </div>
            <button
              type="button"
              onClick={handleFileRemove}
              className="tw-ml-4 tw-text-neutral tw-hover:text-danger tw-transition-colors tw-duration-200"
              title="Dosyayı Kaldır"
            >
              <FiXCircle className="tw-text-xl" />
            </button>
          </div>
        )}
        {value && (
          <p className="tw-text-xs tw-text-neutral tw-mt-2">
            Seçilen dosya: <span className="tw-font-semibold tw-text-secondary-light">{value.name}</span>
          </p>
        )}</>) : (<><div className="tw-flex tw-justify-center tw-items-center"><h1 className="tw-text-primary-text tw-text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}
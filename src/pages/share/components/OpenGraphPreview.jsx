import React from "react";

function OpenGraphPreview({ shareData, BASE_URL, surveyLink }) {
  const getImageSrc = () => {
    if (!shareData?.image) return `${BASE_URL}/uploads/fixShareimg.png`;

    // Eğer file bir string ise direkt URL oluştur
    if (typeof shareData.image.file === "string") {
      return `${BASE_URL}${shareData.image.file}`;
    }

    // Eğer file bir File/Blob ise createObjectURL ile göster
    if (
      shareData.image.file instanceof File ||
      shareData.image.file instanceof Blob
    ) {
      return URL.createObjectURL(shareData.image.file);
    }

    // Diğer durumlarda fallback
    return `${BASE_URL}/uploads/fixShareimg.png`;
  };

  return (
    <div className="rounded-xl overflow-hidden border bg-white">
      <img
        src={getImageSrc()}
        alt="OpenGraph"
        className="w-full h-40 sm:h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-base md:text-lg font-semibold break-words">
          {shareData?.title || "Başlık bulunamadı"}
        </h3>
        <p className="text-sm text-gray-600 break-words">
          {shareData?.description || "Açıklama eklenmemiş."}
        </p>
        <a
          href={surveyLink}
          className="mt-2 inline-block text-blue-500 text-xs hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {surveyLink}
        </a>
      </div>
    </div>
  );
}

export default OpenGraphPreview;

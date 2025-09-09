import React from "react";

function ShareSettings({
  shareData,
  handleChange,
  handleImageChange,
  fileInputRef,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800">
        Paylaşım Ayarları
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Paylaşım Başlığı
        </label>
        <input
          type="text"
          name="title"
          value={shareData?.title}
          onChange={handleChange}
          placeholder="Anket başlığı girin..."
          className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Paylaşım Açıklaması
        </label>
        <textarea
          name="description"
          value={shareData?.description}
          onChange={handleChange}
          rows={4}
          placeholder="Kısa açıklama yazın..."
          className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Open Graph Görseli
        </label>
        <div
          onClick={() => fileInputRef.current.click()}
          className="mt-2 flex items-center justify-center h-36 sm:h-40 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:text-blue-500 transition text-center px-2"
        >
          <span className="text-sm text-gray-500">
            {shareData.image === ""
              ? "Yeni görsel seç"
              : "Görsel seçmek için tıklayın"}
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default ShareSettings;

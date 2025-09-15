import React, { useState, useEffect, useRef } from "react";
import WelcomeText from "../Items/WelcomeText";
import ModalLayout from "../../../layouts/ModalLayout";
import RichTextEditor from "../../common/RichTextEditor";
import he from "he";
import ImageEditor from "../../common/image-editor/index"; // 🔹 eklendi

function WelcomeTextSettingsModel({
  isOpen,
  onClose,
  onSave,
  onChange,
  initialData,
}) {
  const [title, setTitle] = useState("");
  const [titleStyle, setTitleStyle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [helpTextStyle, setHelpTextStyle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePos, setImagePos] = useState(null); // 🔹 görsel konum/boyut
  const fileInputRef = useRef(null);

  useEffect(() => {
    onChange?.({ title, helpText, imagePos }); // 🔹 imagePos parent'a da gider
  }, [title, helpText, imagePos]);

  useEffect(() => {
    setTitle(initialData?.title || "");
    setHelpText(initialData?.helpText || "");
    setImage(initialData?.imageName?.filename);
    setTitleStyle(initialData?.titleStyle || "");
    setHelpTextStyle(initialData?.helpTextStyle || "");
    setImagePos(initialData?.imagePos || null);
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  if (!isOpen) return null;

  const getImageUrl = (image, initialData) => {
    if (image && image instanceof File) {
      return URL.createObjectURL(image);
    }
    if (initialData?.imageName) {
      return `${window.location.origin}${
        typeof initialData.imageName === "string"
          ? initialData.imageName
          : initialData.imageName?.file || ""
      }`;
    }
    return null;
  };

  const leftPanel = (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Hoşgeldin Metni Ayarları</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Mesajınız</label>
        <RichTextEditor
          value={he.decode(titleStyle)}
          onChange={(html) => {
            setTitleStyle(html);
            const tempEl = document.createElement("div");
            tempEl.innerHTML = html;
            setTitle(tempEl.innerText || "");
          }}
          placeholder="Mesajınız"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Alt Mesaj</label>
        <RichTextEditor
          value={he.decode(helpTextStyle)}
          onChange={(html) => {
            setHelpTextStyle(html);
            const tempEl = document.createElement("div");
            tempEl.innerHTML = html;
            setHelpText(tempEl.innerText || "");
          }}
          placeholder="Alt Mesaj"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Karşılama Görseli
        </label>
        <div
          onClick={() => fileInputRef.current.click()}
          className="mt-2 flex items-center justify-center h-36 sm:h-40 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:text-blue-500 transition text-center px-2"
        >
          <span className="text-sm text-gray-500">
            {!image
              ? "Yeni görsel seç"
              : `Seçilen Görsel: ${image.name ? image.name : image}`}
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

      {/* 🔹 Yeni Görsel Editörü */}
      {image && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Görsel Konum & Boyut
          </label>
          <ImageEditor
            src={getImageUrl(image, initialData)}
            onChange={setImagePos}
            initialPos={imagePos}
          />
        </div>
      )}

      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            onSave(
              { title, helpText, titleStyle, helpTextStyle, imagePos }, // 🔹 imagePos backend'e
              image,
            );
            setTitle("");
            setHelpText("");
            setImage(null);
            setImagePos(null);
          }}
        >
          Kaydet
        </button>
      </div>
    </div>
  );

  const rightPanel = (
    <WelcomeText
      titleStyle={titleStyle}
      helpTextStyle={helpTextStyle}
      image={getImageUrl(image, initialData)}
      imagePos={imagePos}
      // 🔹 Eğer WelcomeText konum & boyutu destekliyorsa imagePos'u da oraya iletebilirsin
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default WelcomeTextSettingsModel;

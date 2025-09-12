import React from "react";
import toast from "react-hot-toast";
import { Link as LinkIcon, XCircle } from "lucide-react";
import ToolbarButton from "./ToolbarButton";

export default function LinkButton({ editor }) {
  const handleLink = () => {
    const currentLink = editor.getAttributes("link")?.href || "";
    let inputValue = currentLink;

    toast(
      (t) => (
        <div className="flex flex-col gap-2 p-2">
          <input
            type="text"
            placeholder="Bağlantı giriniz"
            className="border p-1 rounded w-64"
            defaultValue={currentLink}
            onChange={(e) => (inputValue = e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-1"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();
                toast.dismiss(t.id);
              }}
            >
              <XCircle size={16} /> Kaldır
            </button>
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              İptal
            </button>
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                if (inputValue) {
                  // Seçili tüm metinlere uygula
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .setLink({ href: inputValue })
                    .run();
                }
                toast.dismiss(t.id);
              }}
            >
              {currentLink ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };

  return (
    <ToolbarButton
      onClick={handleLink}
      isActive={editor.isActive("link")}
      title="Link Ekle / Düzenle / Kaldır"
    >
      <LinkIcon size={18} />
    </ToolbarButton>
  );
}

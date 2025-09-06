import React, { useState, useMemo } from "react";
import { MdClose } from "react-icons/md";

export default function CopyPage({ surveys, data, close }) {
  const [form, setForm] = useState({
    title: data.title || "",
    description: data.description || "",
    group: data.group || "",
  });

  // Tüm unique group isimlerini alıyoruz
  const groupOptions = useMemo(() => {
    const groups = surveys.map((s) => s.group).filter(Boolean);
    return [...new Set(groups)];
  }, [surveys]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // _id ve otomatik alanları sil
    const { _id, createdAt, lastModified, ...rest } = data;

    const editingData = {
      ...rest,
      title: form.title,
      description: form.description,
      group: form.group,
    };

    console.log("Editing Data (ready to save):", editingData);

    // artık backend'e gönderebilirsin, yeni ObjectId atanacak
    close(editingData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative flex flex-col gap-4">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <MdClose className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold">Anketi Kopyala / Düzenle</h2>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Başlık</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Açıklama</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Grup Seç / Yeni Grup</label>
          <select
            name="group"
            value={form.group}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="">-- Grup Seçin --</option>
            {groupOptions.map((g, idx) => (
              <option key={idx} value={g}>
                {g}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Yeni grup ismi yazmak için aşağıyı kullanın
          </span>
          <input
            name="group"
            value={form.group}
            onChange={handleChange}
            placeholder="Yeni grup ismi"
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}

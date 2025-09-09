import React from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function TagInput({ tags, setTags, newTag, setNewTag }) {
  const handleAddTag = () => {
    const tag = newTag.trim();
    if (!tag) return toast.error("Etiket boş olamaz.");
    if (tags.includes(tag)) {
      toast("Bu etiket zaten eklenmiş.");
      setNewTag("");
      return;
    }
    if (tags.length >= 3) return toast("En fazla 3 etiket ekleyebilirsiniz.");
    setTags([...tags, tag]);
    setNewTag("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) =>
    setTags(tags.filter((t) => t !== tagToRemove));

  return (
    <div>
      <div className="flex gap-2 mb-2 flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-primary-light text-primary-text rounded-full px-3 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-primary-dark hover:text-danger"
              title="Etiketi kaldır"
            >
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          tags.length >= 3 ? "Etiket limiti doldu" : "Yeni etiket ekle"
        }
        disabled={tags.length >= 3}
        className="w-full p-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
      />
      <button
        type="button"
        onClick={handleAddTag}
        disabled={tags.length >= 3}
        className={`mt-2 w-full py-2 rounded-lg font-semibold transition ${
          tags.length >= 3
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-secondary text-white"
        }`}
      >
        Etiket Ekle
      </button>
    </div>
  );
}

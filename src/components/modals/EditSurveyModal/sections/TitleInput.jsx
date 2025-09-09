import React from "react";

export default function TitleInput({ value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary-dark mb-1">
        Anket Başlığı
      </label>
      <input
        name="title"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Anket başlığı"}
        className="w-full p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
      />
    </div>
  );
}

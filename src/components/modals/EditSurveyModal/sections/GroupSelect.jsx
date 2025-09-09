import React, { useState } from "react";

export default function GroupSelect({ group, setGroup, surveys }) {
  const [isNewGroup, setIsNewGroup] = useState(false);
  const groupOptions = [
    ...new Set(surveys.map((s) => s.group).filter(Boolean)),
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-primary-dark mb-1">
        Klasör Adı
      </label>
      <select
        value={isNewGroup ? "__new" : group}
        onChange={(e) => {
          if (e.target.value === "__new") {
            setIsNewGroup(true);
            setGroup("");
          } else {
            setIsNewGroup(false);
            setGroup(e.target.value);
          }
        }}
        className="w-full p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
      >
        <option value="">Grup Seçiniz</option>
        {groupOptions.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
        <option value="__new">+ Yeni Grup Oluştur</option>
      </select>
      {isNewGroup && (
        <input
          type="text"
          value={group}
          placeholder="Yeni grup adı giriniz"
          onChange={(e) => setGroup(e.target.value)}
          className="mt-2 w-full p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      )}
    </div>
  );
}

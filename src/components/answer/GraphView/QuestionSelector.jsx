import React from "react";

export default function QuestionSelector({ items, selectedQuestionId, setSelectedQuestionId }) {
  return (
    <div>
      <label className="block font-semibold mb-1">Soru Seçiniz:</label>
      <select
        className="p-2 border rounded w-full max-w-xs"
        value={selectedQuestionId}
        onChange={(e) => setSelectedQuestionId(e.target.value)}
      >
        <option value="">-- Soru seçiniz --</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title || item.label || item.id}
          </option>
        ))}
      </select>
    </div>
  );
}

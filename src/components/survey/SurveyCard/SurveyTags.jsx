import React from "react";

export default function SurveyTags({ tags }) {
  if (!tags || tags.length === 0) {
    return <p className="text-sm text-neutral-500 mb-3">Henüz etiket yok.</p>;
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Anket Etiketleriniz</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full select-none truncate max-w-[8rem]"
            title={tag}
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span
            className="text-xs font-medium bg-indigo-300 text-indigo-900 px-3 py-1 rounded-full select-none cursor-default"
            title={tags.slice(3).join(", ")}
          >
            +{tags.length - 3} daha
          </span>
        )}
      </div>
    </>
  );
}

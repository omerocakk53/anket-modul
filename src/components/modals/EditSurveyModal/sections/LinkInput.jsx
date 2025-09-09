import React from "react";

export default function LinkInput({ link, setLink }) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary-dark mb-1">
        Link Adresi
      </label>
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-dark whitespace-nowrap">
          https://anketline.odanet.net/
        </span>
        <input
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="anket-linki"
          className="flex-1 p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>
      <p className="text-xs text-neutral-dark mt-1">
        Küçük harf, sayı ve tire (-) kullanılabilir. Örn: <code>ilk-anket</code>
      </p>
    </div>
  );
}

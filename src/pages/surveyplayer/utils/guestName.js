let cachedGuestName = null;

export function getOrCreateGuestName() {
  if (cachedGuestName) return cachedGuestName;

  // --- burada localStorage kontrolü yapılır ---
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("guestName");
    if (saved) {
      cachedGuestName = saved;
      return cachedGuestName;
    }
  }

  // Yeni benzersiz isim üret
  let newName;
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    newName = "Guest-" + crypto.randomUUID();
  } else {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
      "",
    );
    newName =
      "Guest-" +
      [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20),
      ].join("-");
  }

  cachedGuestName = newName;

  // Tarayıcıda kalıcı olarak sakla
  if (typeof window !== "undefined") {
    localStorage.setItem("guestName", cachedGuestName);
  }

  return cachedGuestName;
}

export function clampImagePos(pos, bounds) {
  const x = Math.max(0, Math.min(pos.x, bounds.width - pos.width));
  const y = Math.max(0, Math.min(pos.y, bounds.height - pos.height));
  const width = Math.min(pos.width, bounds.width);
  const height = Math.min(pos.height, bounds.height);

  return { x, y, width, height };
}

// Oranlı değerleri clamp etmek için:
export function clampImagePosRatio(ratioPos) {
  return {
    x: Math.max(0, Math.min(ratioPos.x, 1 - ratioPos.width)),
    y: Math.max(0, Math.min(ratioPos.y, 1 - ratioPos.height)),
    width: Math.min(ratioPos.width, 1),
    height: Math.min(ratioPos.height, 1),
  };
}

import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

export default function ImageEditor({ src, onChange, initialPos }) {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });

  const [pos, setPos] = useState({
    x: initialPos?.x || 0.05,
    y: initialPos?.y || 0.05,
    width: initialPos?.width || 0.25,
    height: initialPos?.height || 0.25,
  });

  // Container boyutlarını al
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
  }, []);

  const handleUpdate = (data) => {
    // px -> oranlı
    const newPos = {
      x: data.x / containerSize.width,
      y: data.y / containerSize.height,
      width: data.width / containerSize.width,
      height: data.height / containerSize.height,
    };
    setPos(newPos);
    onChange?.(newPos);
  };

  const pxPos = {
    x: pos.x * containerSize.width,
    y: pos.y * containerSize.height,
    width: pos.width * containerSize.width,
    height: pos.height * containerSize.height,
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "400px",
        border: "1px dashed #aaa",
        position: "relative",
        background:
          "radial-gradient(circle,rgba(69, 69, 69, 1) 0%, rgba(135, 135, 135, 1) 50%, rgba(232, 232, 232, 1) 100%)",
      }}
    >
      <Rnd
        bounds="parent"
        lockAspectRatio
        size={{ width: pxPos.width, height: pxPos.height }}
        position={{ x: pxPos.x, y: pxPos.y }}
        onDragStop={(e, d) =>
          handleUpdate({
            ...pxPos,
            x: d.x,
            y: d.y,
            width: pxPos.width,
            height: pxPos.height,
          })
        }
        onResizeStop={(e, dir, ref, delta, p) =>
          handleUpdate({
            x: p.x,
            y: p.y,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          })
        }
        style={{
          border: "2px solid #4a90e2",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          background: "transparent", // burada Rnd’in arkaplanı yok
        }}
      >
        {src && (
          <img
            src={src}
            alt="editable"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        )}
      </Rnd>
    </div>
  );
}

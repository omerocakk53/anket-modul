import React, { useState, useRef, useEffect } from "react";
import { Sketch } from "@uiw/react-color";
import { Droplet, PaintBucket } from "lucide-react";

export default function ColorToolbar({ editor }) {
  const [openPicker, setOpenPicker] = useState(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  const getColor = (type) => {
    if (type === "text")
      return editor.getAttributes("textStyle")?.color || "#000";
    if (type === "background")
      return editor.getAttributes("highlight")?.color || "#fff";
    return "#000";
  };

  const handleChange = (type) => (color) => {
    const { r, g, b, a } = color.rgba;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;

    if (type === "text") {
      editor.chain().focus().setColor(rgba).run();
    } else if (type === "background") {
      editor.chain().focus().setHighlight({ color: rgba }).run();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        textRef.current &&
        !textRef.current.contains(e.target) &&
        bgRef.current &&
        !bgRef.current.contains(e.target)
      ) {
        setOpenPicker(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderPicker = (ref, type, Icon, title) => (
    <div ref={ref} className="relative">
      <button
        className="p-2 rounded hover:bg-gray-200"
        onClick={() => setOpenPicker(openPicker === type ? null : type)}
        title={title}
      >
        <Icon size={18} />
      </button>
      {openPicker === type && (
        <div className="absolute z-10 mt-2 shadow-lg bg-white rounded">
          <Sketch
            color={getColor(type)}
            onChange={handleChange(type)}
            style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex gap-2 items-center relative">
      {renderPicker(textRef, "text", Droplet, "Metin Rengi")}
      {renderPicker(bgRef, "background", PaintBucket, "Arka Plan Rengi")}
    </div>
  );
}

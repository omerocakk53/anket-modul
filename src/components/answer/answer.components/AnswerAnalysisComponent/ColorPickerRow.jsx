import React from 'react';

function ColorPickerRow({ colors, onColorChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-1">
      {colors.map((color, index) => (
        <input
          key={index}
          type="color"
          className="w-8 h-8 p-0 border-0 cursor-pointer rounded-md focus:ring-2 focus:ring-blue-400"
          value={color}
          onChange={(e) => onColorChange(index, e.target.value)}
          aria-label={`Renk seçici ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default ColorPickerRow;

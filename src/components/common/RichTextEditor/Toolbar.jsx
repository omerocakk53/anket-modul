import React from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Type,
} from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import ColorToolbar from "./ColorToolbar";
import LinkButton from "./LinkButton";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
export default function Toolbar({ editor }) {
  if (!editor) return null;

  const getCurrentFontSize = () => {
    const size = editor.getAttributes("textStyle")?.fontSize;
    return size ? parseInt(size) : 16;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border bg-gray-50 p-2 rounded-t-lg shadow-sm">
      {/* Bold */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBoldImportant().run()}
        isActive={editor.isActive("textStyle", { fontWeight: "bold" })}
        title="Kalın Yazı"
      >
        <Bold size={18} />
      </ToolbarButton>

      {/* Italic */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalicImportant().run()}
        isActive={editor.isActive("textStyle", { fontStyle: "italic" })}
        title="Eğik Yazı"
      >
        <Italic size={18} />
      </ToolbarButton>

      {/* Underline */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderlineImportant().run()}
        isActive={editor.isActive("textStyle", { textDecoration: "underline" })}
        title="Altı Çizili Yazı"
      >
        <UnderlineIcon size={18} />
      </ToolbarButton>

      {/* Link */}
      <LinkButton editor={editor} />

      {/* Font Size Artır */}
      <ToolbarButton
        onClick={() => {
          const current = getCurrentFontSize();
          editor
            .chain()
            .focus()
            .setFontSizeImportant(`${current + 2}px`)
            .run();
        }}
        title="Yazı Boyutunu Artır"
      >
        <Type size={14} />
      </ToolbarButton>

      {/* Font Size Azalt */}
      <ToolbarButton
        onClick={() => {
          const current = getCurrentFontSize();
          editor
            .chain()
            .focus()
            .setFontSizeImportant(`${current - 2}px`)
            .run();
        }}
        title="Yazı Boyutunu Azalt"
      >
        <Type size={10} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="Sola Hizala"
      >
        <AlignLeft size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="Ortala"
      >
        <AlignCenter size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="Sağa Hizala"
      >
        <AlignRight size={18} />
      </ToolbarButton>
      {/* Text & Background Color */}
      <ColorToolbar editor={editor} />
    </div>
  );
}

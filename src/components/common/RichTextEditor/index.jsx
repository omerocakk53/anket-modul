import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import he from "he";
import { ImportantText } from "./extensions/ImportantText";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { FontSize } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ italic: false }),
      ImportantText, // mutlaka buraya ekle
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      Underline,
      Highlight.configure({ multicolor: true }),
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"], // bu tiplerde çalışır
      }),
    ],
    content: he.decode(value) ?? placeholder,
    editorProps: {
      attributes: {
        placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
  });

  // 🔹 value dışarıdan değişirse editor'e set et
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="w-full">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="bg-white p-4 rounded-b-lg border shadow-sm editor-styles min-h-[100px] max-w-1/2"
      />
    </div>
  );
}

import { Mark, mergeAttributes } from "@tiptap/core";

export const ImportantText = Mark.create({
  name: "textStyle", // textStyle olarak tanımlıyoruz
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      fontWeight: { default: null },
      fontStyle: { default: null },
      textDecoration: { default: null },
      color: { default: null },
      backgroundColor: { default: null },
      fontSize: { default: null },
      textAlign: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: "span" }];
  },
  renderHTML({ HTMLAttributes }) {
    const styles = [];
    if (HTMLAttributes.fontWeight)
      styles.push(`font-weight: ${HTMLAttributes.fontWeight} !important`);
    if (HTMLAttributes.fontStyle)
      styles.push(`font-style: ${HTMLAttributes.fontStyle} !important`);
    if (HTMLAttributes.textDecoration)
      styles.push(
        `text-decoration: ${HTMLAttributes.textDecoration} !important`
      );
    if (HTMLAttributes.color)
      styles.push(`color: ${HTMLAttributes.color} !important`);
    if (HTMLAttributes.backgroundColor)
      styles.push(
        `background-color: ${HTMLAttributes.backgroundColor} !important`
      );
    if (HTMLAttributes.fontSize)
      styles.push(`font-size: ${HTMLAttributes.fontSize} !important`);
    if (HTMLAttributes.textAlign)
      styles.push(`text-align:${HTMLAttributes.textAlign} !important`);
    return [
      "span",
      mergeAttributes(HTMLAttributes, { style: styles.join("; ") }),
      0,
    ];
  },
  addCommands() {
    return {
      toggleBoldImportant:
        () =>
        ({ commands, state }) => {
          const { from, to } = state.selection;
          let hasBold = false;
          state.doc.nodesBetween(from, to, (node) => {
            node.marks.forEach((mark) => {
              if (
                mark.type.name === "textStyle" &&
                mark.attrs.fontWeight === "bold"
              ) {
                hasBold = true;
              }
            });
          });
          return commands.setMark("textStyle", {
            fontWeight: hasBold ? null : "bold",
          });
        },

      toggleItalicImportant:
        () =>
        ({ commands, state }) => {
          const { from, to } = state.selection;
          let hasItalic = false;
          state.doc.nodesBetween(from, to, (node) => {
            node.marks.forEach((mark) => {
              if (
                mark.type.name === "textStyle" &&
                mark.attrs.fontStyle === "italic"
              ) {
                hasItalic = true;
              }
            });
          });
          return commands.setMark("textStyle", {
            fontStyle: hasItalic ? null : "italic",
          });
        },

      toggleUnderlineImportant:
        () =>
        ({ commands, state }) => {
          const { from, to } = state.selection;
          let hasUnderline = false;
          state.doc.nodesBetween(from, to, (node) => {
            node.marks.forEach((mark) => {
              if (
                mark.type.name === "textStyle" &&
                mark.attrs.textDecoration === "underline"
              ) {
                hasUnderline = true;
              }
            });
          });
          return commands.setMark("textStyle", {
            textDecoration: hasUnderline ? null : "underline",
          });
        },

      setColorImportant:
        (color) =>
        ({ commands }) =>
          commands.setMark("textStyle", { color }),

      setBgColorImportant:
        (color) =>
        ({ commands }) =>
          commands.setMark("textStyle", { backgroundColor: color }),

      setFontSizeImportant:
        (size) =>
        ({ commands }) =>
          commands.setMark("textStyle", { fontSize: size }),
      setTextAlignImportant:
        (align) =>
        ({ commands }) =>
          commands.setMark("textStyle", { textAlign: align }),
    };
  },
});

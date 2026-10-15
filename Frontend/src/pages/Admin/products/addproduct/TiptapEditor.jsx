// src/pages/Admin/products/addproduct/TiptapEditor.jsx
// Production rich text editor for Product Overview using Tiptap.
// Provides strictly: Headings (H1, H2, H3), Bold, Italic, Underline, Numbered List, Bullet List.
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from "lucide-react";

const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Underline,
];

export default function TiptapEditor({
  value = "",
  onChange,
  placeholder = "Write product overview...",
}) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // If editor only has an empty paragraph, send empty string for clean validation
      if (html === "<p></p>") {
        onChange("");
      } else {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: "tiptap px-4 py-3 text-sm text-slate-800 focus:outline-none min-h-[160px] leading-relaxed",
        "data-placeholder": placeholder,
      },
    },
  });

  // Sync external value changes (e.g. initialData load or form reset) when editor is not focused
  useEffect(() => {
    if (!editor) return;
    if (editor.isFocused) return;

    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="w-full h-40 border border-slate-300 rounded-xl bg-slate-50 animate-pulse flex items-center justify-center text-xs text-slate-400">
        Loading editor...
      </div>
    );
  }

  const getButtonClass = (isActive) =>
    `inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
      isActive
        ? "bg-[#004060] text-white shadow-xs"
        : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
    }`;

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#004060]/20 focus-within:border-[#004060] transition-all">
      {/* Editor Toolbar - strictly Headings, Bold, Italic, Underline, Bullet List, Numbered List */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1.5 select-none">
        {/* Headings */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={getButtonClass(editor.isActive("heading", { level: 1 }))}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={getButtonClass(editor.isActive("heading", { level: 2 }))}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={getButtonClass(editor.isActive("heading", { level: 3 }))}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Inline Formatting: Bold, Italic, Underline */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={getButtonClass(editor.isActive("bold"))}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={getButtonClass(editor.isActive("italic"))}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={getButtonClass(editor.isActive("underline"))}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        {/* Lists: Bullets & Numbered */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={getButtonClass(editor.isActive("bulletList"))}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={getButtonClass(editor.isActive("orderedList"))}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editable Content Area */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

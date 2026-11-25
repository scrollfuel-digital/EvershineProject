// src/pages/Admin/products/addproduct/TiptapEditor.jsx
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Table as TableIcon,
  Trash2,
} from "lucide-react";

const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
  }),
  Underline,
  Table.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
];

export default function TiptapEditor({
  value = "",
  onChange,
  placeholder = "Write product overview...",
  enableTable = false,
}) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: value || "",
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
    editorProps: {
      attributes: {
        class: "tiptap px-4 py-3 text-sm sm:text-base text-slate-800 focus:outline-none min-h-[160px] leading-relaxed",
        "data-placeholder": placeholder,
      },
    },
  });

  useEffect(() => {
    if (!editor || editor.isFocused) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="w-full h-40 border border-slate-300 rounded-xl bg-slate-50 animate-pulse flex items-center justify-center text-sm text-slate-400">
        Loading editor...
      </div>
    );
  }

  const getButtonClass = (isActive) =>
    `inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
      isActive
        ? "bg-[#004060] text-white"
        : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
    }`;

  const toolbarGroups = [
    [
      { title: "Heading 1", icon: Heading1, active: editor.isActive("heading", { level: 1 }), action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
      { title: "Heading 2", icon: Heading2, active: editor.isActive("heading", { level: 2 }), action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
      { title: "Heading 3", icon: Heading3, active: editor.isActive("heading", { level: 3 }), action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    ],
    [
      { title: "Bold", icon: Bold, active: editor.isActive("bold"), action: () => editor.chain().focus().toggleBold().run() },
      { title: "Italic", icon: Italic, active: editor.isActive("italic"), action: () => editor.chain().focus().toggleItalic().run() },
      { title: "Underline", icon: UnderlineIcon, active: editor.isActive("underline"), action: () => editor.chain().focus().toggleUnderline().run() },
    ],
    [
      { title: "Bullet List", icon: List, active: editor.isActive("bulletList"), action: () => editor.chain().focus().toggleBulletList().run() },
      { title: "Numbered List", icon: ListOrdered, active: editor.isActive("orderedList"), action: () => editor.chain().focus().toggleOrderedList().run() },
    ],
  ];

  const tableActions = [
    { label: "+Row", title: "Add Row", action: () => editor.chain().focus().addRowAfter().run() },
    { label: "-Row", title: "Delete Row", action: () => editor.chain().focus().deleteRow().run() },
    { label: "+Col", title: "Add Column", action: () => editor.chain().focus().addColumnAfter().run() },
    { label: "-Col", title: "Delete Column", action: () => editor.chain().focus().deleteColumn().run() },
  ];

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#004060]/20 focus-within:border-[#004060] transition-all">
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1.5 select-none">
        {toolbarGroups.map((group, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {groupIdx > 0 && <div className="w-px h-5 bg-slate-300 mx-1" />}
            <div className="flex items-center gap-1">
              {group.map((btn) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.title}
                    type="button"
                    onClick={btn.action}
                    className={getButtonClass(btn.active)}
                    title={btn.title}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}

        {enableTable && (
          <>
            <div className="w-px h-5 bg-slate-300 mx-1" />
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                }
                className={`${getButtonClass(editor.isActive("table"))} px-2.5 w-auto gap-1`}
                title="Insert 3x3 Table"
              >
                <TableIcon className="w-4 h-4" />
                <span>Table</span>
              </button>
              {editor.isActive("table") && (
                <>
                  {tableActions.map((t) => (
                    <button
                      key={t.title}
                      type="button"
                      onClick={t.action}
                      className={`${getButtonClass(false)} px-2 w-auto`}
                      title={t.title}
                    >
                      {t.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                    title="Delete Table"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

interface TextEditorProps {
  theme?: string;
  disabled: boolean;
  value: string | undefined;
  onChange: (content: string, delta: any, source: any, editor: any) => void;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  placeholder = "Start typing...",
  theme = "snow",
  value,
  disabled = false,
  onChange,
}) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];

  return (
    <ReactQuill
      theme={theme}
      value={value}
      modules={modules}
      formats={formats}
      onChange={onChange}
      readOnly={disabled}
      placeholder={placeholder}
      style={{ maxHeight: "20rem" }}
    />
  );
};

export default TextEditor;

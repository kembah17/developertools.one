"use client";
import { useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  language?: string;
}

export default function CodeEditor({ value, onChange, placeholder = "Paste your code here...", readOnly = false, rows = 16, language }: CodeEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const lines = value ? value.split("\n").length : 1;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const t = e.currentTarget;
      const start = t.selectionStart;
      const end = t.selectionEnd;
      const newVal = value.substring(0, start) + "  " + value.substring(end);
      onChange(newVal);
      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = start + 2; });
    }
  };

  return (
    <div className="relative bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
      {language && <div className="absolute top-2 right-3 text-xs text-text-dark-muted font-mono uppercase">{language}</div>}
      <div className="flex">
        <div className="select-none py-3 px-2 text-right text-text-dark-muted text-xs font-mono leading-relaxed min-w-[3rem] bg-surface-dark-alt border-r border-border-dark">
          {Array.from({ length: Math.max(lines, rows) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={rows}
          spellCheck={false}
          className="code-editor flex-1 bg-transparent text-text-dark p-3 w-full border-none focus:outline-none placeholder:text-text-dark-muted text-sm leading-relaxed"
        />
      </div>
    </div>
  );
}

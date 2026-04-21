"use client";
import CopyButton from "./CopyButton";

interface OutputPanelProps {
  content: string;
  title?: string;
  language?: string;
}

export default function OutputPanel({ content, title = "Output", language }: OutputPanelProps) {
  return (
    <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-surface-dark-alt border-b border-border-dark">
        <span className="text-sm font-medium text-text-dark">{title}</span>
        <div className="flex items-center gap-2">
          {language && <span className="text-xs text-text-dark-muted font-mono uppercase">{language}</span>}
          {content && <CopyButton text={content} />}
        </div>
      </div>
      <pre className="p-4 text-sm text-text-dark font-mono overflow-auto max-h-96 leading-relaxed whitespace-pre-wrap">{content || <span className="text-text-dark-muted">Output will appear here...</span>}</pre>
    </div>
  );
}

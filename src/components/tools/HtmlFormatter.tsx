"use client";
import { useState, useCallback } from "react";
import CodeEditor from "@/components/ui/CodeEditor";
import CopyButton from "@/components/ui/CopyButton";

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = useCallback(async () => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      const prettier = await import("prettier/standalone");
      const htmlPlugin = await import("prettier/plugins/html");
      const result = await prettier.format(input, {
        parser: "html",
        plugins: [htmlPlugin],
        tabWidth: indent,
        printWidth: 120,
      });
      setOutput(result);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Formatting failed");
      setOutput("");
    }
  }, [input, indent]);

  const minify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const minified = input
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><")
        .replace(/^\s+|\s+$/gm, "")
        .trim();
      setOutput(minified);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Minification failed");
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <label className="text-sm font-medium text-text dark:text-text-dark">Indent:</label>
          {[2, 4].map((v) => (
            <button key={v} onClick={() => setIndent(v)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${indent === v ? "bg-primary text-surface border-primary" : "bg-surface-alt dark:bg-surface-dark-alt border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:border-primary"}`}>
              {v} spaces
            </button>
          ))}
          <button onClick={format} className="px-4 py-1.5 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Format</button>
          <button onClick={minify} className="px-4 py-1.5 text-sm font-medium bg-secondary hover:bg-secondary/80 text-surface rounded-lg transition-colors">Minify</button>
        </div>
        <CodeEditor value={input} onChange={setInput} placeholder="Paste your HTML here..." language="html" />
      </div>

      {error && <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4"><p className="text-secondary font-medium text-sm">❌ {error}</p></div>}

      {output && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text dark:text-text-dark">Output</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-light dark:text-text-dark-muted">
                {new Blob([input]).size.toLocaleString()}B → {new Blob([output]).size.toLocaleString()}B ({((1 - new Blob([output]).size / new Blob([input]).size) * 100).toFixed(1)}% {new Blob([output]).size < new Blob([input]).size ? "smaller" : "larger"})
              </span>
              <CopyButton text={output} />
            </div>
          </div>
          <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto max-h-[500px] leading-relaxed whitespace-pre">{output}</pre>
        </div>
      )}
    </div>
  );
}

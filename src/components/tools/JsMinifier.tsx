"use client";
import { useState, useCallback } from "react";
import CodeEditor from "@/components/ui/CodeEditor";
import CopyButton from "@/components/ui/CopyButton";

export default function JsMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null);

  const minify = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); setStats(null); return; }
    try {
      let code = input;
      // Remove single-line comments (but not URLs with //)
      code = code.replace(/([^:"'])\/\/.*$/gm, "$1");
      // Remove multi-line comments
      code = code.replace(/\/\*[\s\S]*?\*\//g, "");
      // Remove leading/trailing whitespace per line
      code = code.replace(/^\s+/gm, "");
      code = code.replace(/\s+$/gm, "");
      // Collapse multiple spaces to one
      code = code.replace(/\s{2,}/g, " ");
      // Remove newlines
      code = code.replace(/\n+/g, "");
      // Remove spaces around operators (careful approach)
      code = code.replace(/\s*([{}();,=+\-*/<>!&|?:])/g, "$1");
      code = code.replace(/([{}();,=+\-*/<>!&|?:])\s*/g, "$1");
      // Fix edge cases: restore space after keywords
      const keywords = ["var", "let", "const", "return", "function", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "new", "delete", "typeof", "instanceof", "in", "of", "throw", "try", "catch", "finally", "class", "extends", "import", "export", "default", "from", "async", "await", "yield"];
      keywords.forEach((kw) => {
        const re = new RegExp(`\\b${kw}([^\\s;{}()])`, "g");
        code = code.replace(re, `${kw} $1`);
      });

      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([code]).size;
      setOutput(code);
      setStats({ original: originalSize, minified: minifiedSize });
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Minification failed");
      setOutput("");
      setStats(null);
    }
  }, [input]);

  const reduction = stats ? ((1 - stats.minified / stats.original) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button onClick={minify} className="px-4 py-1.5 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Minify</button>
          <button onClick={() => { setInput(""); setOutput(""); setError(""); setStats(null); }} className="px-4 py-1.5 text-sm font-medium bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark text-text-light dark:text-text-dark-muted rounded-lg hover:border-primary transition-colors">Clear</button>
        </div>
        <CodeEditor value={input} onChange={setInput} placeholder="Paste your JavaScript code here..." language="javascript" />
      </div>

      {error && <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4"><p className="text-secondary font-medium text-sm">❌ {error}</p></div>}

      {output && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text dark:text-text-dark">Minified Output</h3>
            <CopyButton text={output} />
          </div>
          <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto max-h-64 leading-relaxed whitespace-pre-wrap break-all">{output}</pre>
          {stats && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-surface-alt dark:bg-surface-dark-alt rounded-lg p-3 text-center">
                <div className="text-xs text-text-light dark:text-text-dark-muted">Original</div>
                <div className="text-lg font-bold text-text dark:text-text-dark">{stats.original.toLocaleString()} B</div>
              </div>
              <div className="bg-surface-alt dark:bg-surface-dark-alt rounded-lg p-3 text-center">
                <div className="text-xs text-text-light dark:text-text-dark-muted">Minified</div>
                <div className="text-lg font-bold text-text dark:text-text-dark">{stats.minified.toLocaleString()} B</div>
              </div>
              <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-3 text-center">
                <div className="text-xs text-text-light dark:text-text-dark-muted">Reduction</div>
                <div className="text-lg font-bold text-accent">{reduction}%</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

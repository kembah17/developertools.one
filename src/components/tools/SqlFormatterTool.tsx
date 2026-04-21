"use client";
import { useState, useCallback } from "react";
import { format as formatSql } from "sql-formatter";
import CodeEditor from "@/components/ui/CodeEditor";
import CopyButton from "@/components/ui/CopyButton";

type SqlDialect = "sql" | "mysql" | "postgresql" | "sqlite" | "tsql";

const dialects: { id: SqlDialect; label: string }[] = [
  { id: "sql", label: "Standard SQL" },
  { id: "mysql", label: "MySQL" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "sqlite", label: "SQLite" },
  { id: "tsql", label: "SQL Server" },
];

export default function SqlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [dialect, setDialect] = useState<SqlDialect>("sql");
  const [indent, setIndent] = useState(2);
  const [uppercase, setUppercase] = useState(true);

  const format = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      const result = formatSql(input, {
        language: dialect,
        tabWidth: indent,
        keywordCase: uppercase ? "upper" : "lower",
      });
      setOutput(result);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Formatting failed");
      setOutput("");
    }
  }, [input, dialect, indent, uppercase]);

  const minify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const minified = input.replace(/\s+/g, " ").replace(/\s*([,;()=<>])\s*/g, "$1").trim();
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
          <label className="text-sm font-medium text-text dark:text-text-dark">Dialect:</label>
          <select value={dialect} onChange={(e) => setDialect(e.target.value as SqlDialect)} className="bg-surface-dark text-text-dark px-3 py-1.5 rounded-lg border border-border-dark text-sm">
            {dialects.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
          <label className="text-sm font-medium text-text dark:text-text-dark">Indent:</label>
          {[2, 4].map((v) => (
            <button key={v} onClick={() => setIndent(v)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${indent === v ? "bg-primary text-surface border-primary" : "bg-surface-alt dark:bg-surface-dark-alt border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:border-primary"}`}>
              {v}
            </button>
          ))}
          <label className="flex items-center gap-1.5 text-sm text-text-light dark:text-text-dark-muted">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" />
            Uppercase keywords
          </label>
          <button onClick={format} className="px-4 py-1.5 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Format</button>
          <button onClick={minify} className="px-4 py-1.5 text-sm font-medium bg-secondary hover:bg-secondary/80 text-surface rounded-lg transition-colors">Minify</button>
        </div>
        <CodeEditor value={input} onChange={setInput} placeholder="Paste your SQL query here..." language="sql" />
      </div>

      {error && <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4"><p className="text-secondary font-medium text-sm">❌ {error}</p></div>}

      {output && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text dark:text-text-dark">Formatted SQL</h3>
            <CopyButton text={output} />
          </div>
          <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto max-h-[500px] leading-relaxed whitespace-pre">{output}</pre>
        </div>
      )}
    </div>
  );
}

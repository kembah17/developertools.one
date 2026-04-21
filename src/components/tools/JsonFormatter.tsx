"use client";
import { useState, useCallback } from "react";
import CodeEditor from "@/components/ui/CodeEditor";
import CopyButton from "@/components/ui/CopyButton";
import TabSwitcher from "@/components/ui/TabSwitcher";

interface TreeNode {
  key: string;
  value: unknown;
  type: string;
  children?: TreeNode[];
}

function buildTree(obj: unknown, key = "root"): TreeNode {
  if (obj === null) return { key, value: "null", type: "null" };
  if (typeof obj === "boolean") return { key, value: String(obj), type: "boolean" };
  if (typeof obj === "number") return { key, value: String(obj), type: "number" };
  if (typeof obj === "string") return { key, value: `"${obj}"`, type: "string" };
  if (Array.isArray(obj)) {
    return { key, value: `Array[${obj.length}]`, type: "array", children: obj.map((item, i) => buildTree(item, String(i))) };
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    return { key, value: `Object{${entries.length}}`, type: "object", children: entries.map(([k, v]) => buildTree(v, k)) };
  }
  return { key, value: String(obj), type: "unknown" };
}

function TreeView({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const colors: Record<string, string> = { string: "#22c55e", number: "#3b82f6", boolean: "#f59e0b", null: "#ef4444" };

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <div className="flex items-center gap-1 py-0.5 font-mono text-sm cursor-pointer hover:bg-surface-dark-alt/50 rounded px-1" onClick={() => hasChildren && setOpen(!open)}>
        {hasChildren ? <span className="text-text-dark-muted w-4 text-center">{open ? "▼" : "▶"}</span> : <span className="w-4" />}
        <span className="text-primary-light font-medium">{node.key}</span>
        <span className="text-text-dark-muted">:</span>
        {hasChildren ? (
          <span className="text-text-dark-muted ml-1">{String(node.value)}</span>
        ) : (
          <span style={{ color: colors[node.type] || "#e2e8f0" }} className="ml-1">{String(node.value)}</span>
        )}
      </div>
      {open && hasChildren && node.children!.map((child, i) => <TreeView key={`${child.key}-${i}`} node={child} depth={depth + 1} />)}
    </div>
  );
}

function syntaxHighlight(json: string): string {
  return json.replace(/(&)|(<)|(>)|(".+?"\s*:)|(".*?")|(-?\d+\.?\d*([eE][+-]?\d+)?)|(true|false)|(null)/g,
    (match, amp, lt, gt, key, str, num, _e, bool, nil) => {
      if (amp) return "&amp;";
      if (lt) return "&lt;";
      if (gt) return "&gt;";
      if (key) return `<span style="color:#fbbf24">${match}</span>`;
      if (str) return `<span style="color:#22c55e">${match}</span>`;
      if (num) return `<span style="color:#3b82f6">${match}</span>`;
      if (bool) return `<span style="color:#f59e0b">${match}</span>`;
      if (nil) return `<span style="color:#ef4444">${match}</span>`;
      return match;
    }
  );
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<string>("2");
  const [view, setView] = useState("formatted");
  const [tree, setTree] = useState<TreeNode | null>(null);

  const format = useCallback(() => {
    if (!input.trim()) { setOutput(""); setError(""); setTree(null); return; }
    try {
      const parsed = JSON.parse(input);
      const indentVal = indent === "tab" ? "	" : Number(indent);
      setOutput(JSON.stringify(parsed, null, indentVal));
      setTree(buildTree(parsed));
      setError("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setTree(null);
    }
  }, [input, indent]);

  const minify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setInput(ev.target?.result as string); };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <label className="text-sm font-medium text-text dark:text-text-dark">Indent:</label>
          {["2", "4", "tab"].map((v) => (
            <button key={v} onClick={() => setIndent(v)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${indent === v ? "bg-primary text-surface border-primary" : "bg-surface-alt dark:bg-surface-dark-alt border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:border-primary"}`}>
              {v === "tab" ? "Tab" : `${v} spaces`}
            </button>
          ))}
          <button onClick={format} className="px-4 py-1.5 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Format</button>
          <button onClick={minify} className="px-4 py-1.5 text-sm font-medium bg-secondary hover:bg-secondary/80 text-surface rounded-lg transition-colors">Minify</button>
          <label className="px-4 py-1.5 text-sm font-medium bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark text-text-light dark:text-text-dark-muted rounded-lg cursor-pointer hover:border-primary transition-colors">
            Upload JSON
            <input type="file" accept=".json,application/json" onChange={handleFile} className="hidden" />
          </label>
        </div>
        <CodeEditor value={input} onChange={(v) => { setInput(v); setError(""); }} placeholder="Paste your JSON here..." language="json" />
      </div>

      {error && (
        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
          <p className="text-secondary font-medium text-sm">❌ {error}</p>
        </div>
      )}

      {output && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <TabSwitcher tabs={[{ id: "formatted", label: "Formatted" }, { id: "highlighted", label: "Highlighted" }, { id: "tree", label: "Tree View" }]} active={view} onChange={setView} />
            <CopyButton text={output} />
          </div>
          {view === "formatted" && (
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto max-h-[500px] leading-relaxed whitespace-pre">{output}</pre>
          )}
          {view === "highlighted" && (
            <pre className="bg-surface-dark rounded-xl p-4 text-sm font-mono overflow-auto max-h-[500px] leading-relaxed whitespace-pre" dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }} />
          )}
          {view === "tree" && tree && (
            <div className="bg-surface-dark rounded-xl p-4 overflow-auto max-h-[500px]">
              <TreeView node={tree} />
            </div>
          )}
          {output && (
            <div className="mt-3 flex gap-4 text-sm text-text-light dark:text-text-dark-muted">
              <span>Input: {new Blob([input]).size.toLocaleString()} bytes</span>
              <span>Output: {new Blob([output]).size.toLocaleString()} bytes</span>
              <span>Ratio: {input.trim() ? ((new Blob([output]).size / new Blob([input]).size) * 100).toFixed(1) : 0}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

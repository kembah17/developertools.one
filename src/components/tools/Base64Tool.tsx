"use client";
import { useState, useCallback, useRef } from "react";
import CopyButton from "@/components/ui/CopyButton";
import TabSwitcher from "@/components/ui/TabSwitcher";

function isBase64(str: string): boolean {
  if (!str || str.length % 4 !== 0) return false;
  try {
    return btoa(atob(str)) === str;
  } catch { return false; }
}

export default function Base64Tool() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const encode = useCallback((text: string) => {
    try {
      let result = btoa(unescape(encodeURIComponent(text)));
      if (urlSafe) result = result.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      setOutput(result);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Encoding failed");
      setOutput("");
    }
  }, [urlSafe]);

  const decode = useCallback((text: string) => {
    try {
      let b64 = text.trim();
      if (urlSafe) {
        b64 = b64.replace(/-/g, "+").replace(/_/g, "/");
        while (b64.length % 4) b64 += "=";
      }
      const result = decodeURIComponent(escape(atob(b64)));
      setOutput(result);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Decoding failed");
      setOutput("");
    }
  }, [urlSafe]);

  const handleInput = (text: string) => {
    setInput(text);
    if (!text.trim()) { setOutput(""); setError(""); return; }
    if (mode === "encode") encode(text);
    else decode(text);
  };

  const handleModeChange = (m: string) => {
    setMode(m);
    setInput("");
    setOutput("");
    setError("");
    setFileName("");
  };

  const autoDetect = () => {
    if (isBase64(input.trim())) {
      setMode("decode");
      decode(input);
    } else {
      setMode("encode");
      encode(input);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const b64 = result.split(",")[1] || result;
      setInput(`[File: ${file.name}]`);
      setOutput(b64);
      setError("");
      setMode("encode");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const downloadDecoded = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decoded.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <TabSwitcher tabs={[{ id: "encode", label: "Encode" }, { id: "decode", label: "Decode" }]} active={mode} onChange={handleModeChange} />
          <button onClick={autoDetect} className="px-3 py-1.5 text-sm font-medium bg-accent hover:bg-accent-dark text-surface rounded-lg transition-colors">Auto-Detect</button>
          <label className="flex items-center gap-2 text-sm text-text-light dark:text-text-dark-muted">
            <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="rounded" />
            URL-safe Base64
          </label>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl transition-colors mb-4 ${dragging ? "border-primary bg-primary/5" : "border-border dark:border-border-dark"}`}
        >
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 string to decode..."}
            rows={8}
            className="w-full bg-transparent text-text dark:text-text-dark font-mono px-4 py-3 text-sm leading-relaxed focus:outline-none"
          />
          {dragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-xl">
              <span className="text-primary font-medium">Drop file here</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="px-4 py-1.5 text-sm font-medium bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark text-text-light dark:text-text-dark-muted rounded-lg cursor-pointer hover:border-primary transition-colors">
            Upload File
            <input ref={fileRef} type="file" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
          </label>
          {fileName && <span className="text-sm text-text-light dark:text-text-dark-muted self-center">📎 {fileName}</span>}
        </div>
      </div>

      {error && (
        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
          <p className="text-secondary font-medium text-sm">❌ {error}</p>
        </div>
      )}

      {output && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text dark:text-text-dark">{mode === "encode" ? "Base64 Output" : "Decoded Output"}</h3>
            <div className="flex gap-2">
              {mode === "decode" && <button onClick={downloadDecoded} className="px-3 py-1.5 text-sm font-medium bg-accent hover:bg-accent-dark text-surface rounded-lg transition-colors">Download</button>}
              <CopyButton text={output} />
            </div>
          </div>
          <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto max-h-64 leading-relaxed whitespace-pre-wrap break-all">{output}</pre>
          <div className="mt-3 text-sm text-text-light dark:text-text-dark-muted">
            Length: {output.length.toLocaleString()} characters
          </div>
        </div>
      )}
    </div>
  );
}

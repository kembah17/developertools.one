"use client";
import { useState, useCallback, useRef } from "react";
import CryptoJS from "crypto-js";
import CopyButton from "@/components/ui/CopyButton";

interface Hashes {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Hashes | null>(null);
  const [compareHash, setCompareHash] = useState("");
  const [compareResult, setCompareResult] = useState<{ algo: string; match: boolean } | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const generateHashes = useCallback((text: string) => {
    if (!text) { setHashes(null); return; }
    setHashes({
      md5: CryptoJS.MD5(text).toString(),
      sha1: CryptoJS.SHA1(text).toString(),
      sha256: CryptoJS.SHA256(text).toString(),
      sha512: CryptoJS.SHA512(text).toString(),
    });
  }, []);

  const handleInput = (text: string) => {
    setInput(text);
    generateHashes(text);
    setCompareResult(null);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setInput(text);
      generateHashes(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const doCompare = () => {
    if (!hashes || !compareHash.trim()) return;
    const clean = compareHash.trim().toLowerCase();
    const algos: (keyof Hashes)[] = ["md5", "sha1", "sha256", "sha512"];
    for (const algo of algos) {
      if (hashes[algo] === clean) {
        setCompareResult({ algo: algo.toUpperCase(), match: true });
        return;
      }
    }
    setCompareResult({ algo: "", match: false });
  };

  const hashEntries: { label: string; key: keyof Hashes; bits: string }[] = [
    { label: "MD5", key: "md5", bits: "128-bit" },
    { label: "SHA-1", key: "sha1", bits: "160-bit" },
    { label: "SHA-256", key: "sha256", bits: "256-bit" },
    { label: "SHA-512", key: "sha512", bits: "512-bit" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">Input Text</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl transition-colors mb-3 ${dragging ? "border-primary bg-primary/5" : "border-border dark:border-border-dark"}`}
        >
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Enter text to hash or drag & drop a file..."
            rows={6}
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

      {hashes && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Generated Hashes</h3>
          <div className="space-y-3">
            {hashEntries.map(({ label, key, bits }) => (
              <div key={key} className="bg-surface-dark rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary-light">{label}</span>
                    <span className="text-xs text-text-dark-muted">({bits})</span>
                  </div>
                  <CopyButton text={hashes[key]} />
                </div>
                <code className="text-sm text-text-dark font-mono break-all">{hashes[key]}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {hashes && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Compare Hash</h3>
          <div className="flex gap-2">
            <input type="text" value={compareHash} onChange={(e) => { setCompareHash(e.target.value); setCompareResult(null); }} placeholder="Paste expected hash to verify..." className="flex-1 bg-surface-dark text-text-dark font-mono px-3 py-2 rounded-lg border border-border-dark text-sm" />
            <button onClick={doCompare} className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Compare</button>
          </div>
          {compareResult && (
            <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${compareResult.match ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary"}`}>
              {compareResult.match ? `✅ Match! Hash matches ${compareResult.algo}` : "❌ No match found against any algorithm"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useCallback } from "react";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import CopyButton from "@/components/ui/CopyButton";

type UuidFormat = "standard" | "uppercase" | "nodashes";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<UuidFormat>("standard");
  const [validateInput, setValidateInput] = useState("");
  const [validationResult, setValidationResult] = useState<boolean | null>(null);

  const formatUuid = useCallback((id: string, fmt: UuidFormat): string => {
    switch (fmt) {
      case "uppercase": return id.toUpperCase();
      case "nodashes": return id.replace(/-/g, "");
      default: return id;
    }
  }, []);

  const generate = useCallback(() => {
    const newUuids = Array.from({ length: Math.min(count, 100) }, () => formatUuid(uuidv4(), format));
    setUuids(newUuids);
  }, [count, format, formatUuid]);

  const validateUuid = useCallback(() => {
    const cleaned = validateInput.trim().toLowerCase();
    // Add dashes back if missing
    let toValidate = cleaned;
    if (cleaned.length === 32 && !cleaned.includes("-")) {
      toValidate = `${cleaned.slice(0,8)}-${cleaned.slice(8,12)}-${cleaned.slice(12,16)}-${cleaned.slice(16,20)}-${cleaned.slice(20)}`;
    }
    setValidationResult(uuidValidate(toValidate));
  }, [validateInput]);

  const allText = uuids.join("\n");

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Generate UUIDs</h3>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div>
            <label className="block text-xs text-text-light dark:text-text-dark-muted mb-1">Count (1-100)</label>
            <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))} className="w-24 bg-surface-dark text-text-dark font-mono px-3 py-2 rounded-lg border border-border-dark text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-light dark:text-text-dark-muted mb-1">Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value as UuidFormat)} className="bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm">
              <option value="standard">Standard (lowercase)</option>
              <option value="uppercase">UPPERCASE</option>
              <option value="nodashes">No dashes</option>
            </select>
          </div>
          <div className="self-end">
            <button onClick={generate} className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Generate</button>
          </div>
        </div>

        {uuids.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-light dark:text-text-dark-muted">{uuids.length} UUID{uuids.length > 1 ? "s" : ""} generated</span>
              <CopyButton text={allText} label="Copy All" />
            </div>
            <div className="bg-surface-dark rounded-xl p-4 max-h-80 overflow-auto space-y-1">
              {uuids.map((id, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <code className="text-sm text-text-dark font-mono">{id}</code>
                  <CopyButton text={id} label="" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Validate UUID</h3>
        <div className="flex gap-2">
          <input type="text" value={validateInput} onChange={(e) => { setValidateInput(e.target.value); setValidationResult(null); }} placeholder="Enter UUID to validate..." className="flex-1 bg-surface-dark text-text-dark font-mono px-3 py-2 rounded-lg border border-border-dark text-sm" />
          <button onClick={validateUuid} className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Validate</button>
        </div>
        {validationResult !== null && (
          <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${validationResult ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary"}`}>
            {validationResult ? "✅ Valid UUID" : "❌ Invalid UUID"}
          </div>
        )}
      </div>
    </div>
  );
}

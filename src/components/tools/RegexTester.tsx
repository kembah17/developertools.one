"use client";
import { useState, useMemo } from "react";
import CopyButton from "@/components/ui/CopyButton";

const commonPatterns = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { name: "URL", pattern: "https?://[^\\s/$.?#].[^\\s]*", flags: "gi" },
  { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}", flags: "g" },
  { name: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "gi" },
  { name: "HTML Tag", pattern: "<[^>]+>", flags: "g" },
  { name: "Integer", pattern: "-?\\d+", flags: "g" },
];

interface MatchInfo {
  full: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [error, setError] = useState("");

  const toggleFlag = (f: string) => {
    setFlags((prev) => prev.includes(f) ? prev.replace(f, "") : prev + f);
  };

  const { matches, highlighted } = useMemo(() => {
    if (!pattern || !testStr) return { matches: [] as MatchInfo[], highlighted: "" };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const allMatches: MatchInfo[] = [];
      let m: RegExpExecArray | null;
      const re2 = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((m = re2.exec(testStr)) !== null) {
        allMatches.push({ full: m[0], index: m.index, groups: m.slice(1) });
        if (!flags.includes("g")) break;
      }

      let html = "";
      let lastIdx = 0;
      for (const match of allMatches) {
        html += escapeHtml(testStr.slice(lastIdx, match.index));
        html += `<mark style="background:#fbbf24;color:#000;padding:1px 2px;border-radius:3px">${escapeHtml(match.full)}</mark>`;
        lastIdx = match.index + match.full.length;
      }
      html += escapeHtml(testStr.slice(lastIdx));
      setError("");
      return { matches: allMatches, highlighted: html };
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid regex");
      return { matches: [] as MatchInfo[], highlighted: "" };
    }
  }, [pattern, flags, testStr]);

  function escapeHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  const loadPattern = (p: typeof commonPatterns[0]) => {
    setPattern(p.pattern);
    setFlags(p.flags);
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">Regex Pattern</label>
          <div className="flex items-center gap-2">
            <span className="text-text-light dark:text-text-dark-muted font-mono text-lg">/</span>
            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Enter regex pattern..." className="flex-1 bg-surface-dark text-text-dark font-mono px-3 py-2 rounded-lg border border-border-dark focus:outline-none focus:border-primary text-sm" />
            <span className="text-text-light dark:text-text-dark-muted font-mono text-lg">/</span>
            <span className="font-mono text-primary text-sm">{flags}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm font-medium text-text dark:text-text-dark">Flags:</span>
          {["g", "i", "m", "s", "u"].map((f) => (
            <button key={f} onClick={() => toggleFlag(f)} className={`px-3 py-1 text-sm font-mono rounded-lg border transition-colors ${flags.includes(f) ? "bg-primary text-surface border-primary" : "bg-surface-alt dark:bg-surface-dark-alt border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:border-primary"}`}>
              {f} <span className="text-xs">({f === "g" ? "global" : f === "i" ? "case-insensitive" : f === "m" ? "multiline" : f === "s" ? "dotAll" : "unicode"})</span>
            </button>
          ))}
        </div>

        {error && <div className="mb-4 p-3 bg-secondary/10 border border-secondary/30 rounded-lg text-secondary text-sm">❌ {error}</div>}

        <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">Test String</label>
        <textarea value={testStr} onChange={(e) => setTestStr(e.target.value)} placeholder="Enter test string..." rows={8} className="w-full bg-surface-dark text-text-dark font-mono px-4 py-3 rounded-xl border border-border-dark focus:outline-none focus:border-primary text-sm leading-relaxed" />
      </div>

      {highlighted && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Match Highlighting ({matches.length} match{matches.length !== 1 ? "es" : ""})</h3>
          <div className="bg-surface-dark rounded-xl p-4 font-mono text-sm text-text-dark leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      )}

      {matches.length > 0 && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text dark:text-text-dark">All Matches</h3>
            <CopyButton text={matches.map((m) => m.full).join("\n")} label="Copy All" />
          </div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {matches.map((m, i) => (
              <div key={i} className="bg-surface-dark rounded-lg p-3 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-primary-light">Match {i + 1}</span>
                  <span className="text-text-dark-muted text-xs">Index: {m.index}</span>
                </div>
                <div className="text-text-dark mt-1">{m.full}</div>
                {m.groups.length > 0 && (
                  <div className="mt-1 text-xs text-text-dark-muted">
                    Groups: {m.groups.map((g, j) => <span key={j} className="inline-block bg-surface-dark-alt px-2 py-0.5 rounded mr-1 text-accent">${j + 1}: {g || "(empty)"}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Common Patterns</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {commonPatterns.map((p) => (
            <button key={p.name} onClick={() => loadPattern(p)} className="px-3 py-2 text-sm bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-lg text-text-light dark:text-text-dark-muted hover:border-primary hover:text-primary transition-colors text-left">
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

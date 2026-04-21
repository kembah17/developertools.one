"use client";
import { useState, useCallback } from "react";
import CopyButton from "@/components/ui/CopyButton";
import TabSwitcher from "@/components/ui/TabSwitcher";

interface UrlParts {
  protocol: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
  params: [string, string][];
}

export default function UrlTool() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [encType, setEncType] = useState<"component" | "full">("component");
  const [error, setError] = useState("");
  const [parsed, setParsed] = useState<UrlParts | null>(null);
  const [buildParts, setBuildParts] = useState({ protocol: "https", host: "", path: "", params: "", hash: "" });

  const process = useCallback((text: string, m: string) => {
    if (!text.trim()) { setOutput(""); setError(""); setParsed(null); return; }
    try {
      if (m === "encode") {
        setOutput(encType === "component" ? encodeURIComponent(text) : encodeURI(text));
      } else if (m === "decode") {
        setOutput(encType === "component" ? decodeURIComponent(text) : decodeURI(text));
      } else if (m === "parse") {
        const url = new URL(text);
        const params: [string, string][] = [];
        url.searchParams.forEach((v, k) => params.push([k, v]));
        setParsed({ protocol: url.protocol, host: url.host, pathname: url.pathname, search: url.search, hash: url.hash, params });
      }
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Processing failed");
      setOutput("");
      setParsed(null);
    }
  }, [encType]);

  const handleInput = (text: string) => {
    setInput(text);
    process(text, mode);
  };

  const handleModeChange = (m: string) => {
    setMode(m);
    setOutput("");
    setError("");
    setParsed(null);
    if (input) process(input, m);
  };

  const buildUrl = () => {
    try {
      let url = `${buildParts.protocol}://${buildParts.host}${buildParts.path.startsWith("/") ? "" : "/"}${buildParts.path}`;
      if (buildParts.params.trim()) {
        const pairs = buildParts.params.split("&").map(p => p.split("=").map(s => s.trim()));
        const sp = new URLSearchParams();
        pairs.forEach(([k, v]) => { if (k) sp.set(k, v || ""); });
        url += `?${sp.toString()}`;
      }
      if (buildParts.hash) url += `#${buildParts.hash}`;
      setOutput(url);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Build failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <TabSwitcher tabs={[
            { id: "encode", label: "Encode" },
            { id: "decode", label: "Decode" },
            { id: "parse", label: "Parse URL" },
            { id: "build", label: "Build URL" },
          ]} active={mode} onChange={handleModeChange} />
        </div>

        {(mode === "encode" || mode === "decode") && (
          <div className="flex gap-3 mb-4">
            <button onClick={() => { setEncType("component"); if (input) process(input, mode); }} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${encType === "component" ? "bg-primary text-surface border-primary" : "bg-surface-alt dark:bg-surface-dark-alt border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:border-primary"}`}>
              encodeURIComponent
            </button>
            <button onClick={() => { setEncType("full"); if (input) process(input, mode); }} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${encType === "full" ? "bg-primary text-surface border-primary" : "bg-surface-alt dark:bg-surface-dark-alt border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:border-primary"}`}>
              encodeURI
            </button>
          </div>
        )}

        {mode !== "build" ? (
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to URL-encode..." : mode === "decode" ? "Enter URL-encoded text to decode..." : "Enter full URL to parse (e.g., https://example.com/path?key=value#section)..."}
            rows={6}
            className="w-full bg-surface-dark text-text-dark font-mono px-4 py-3 rounded-xl border border-border-dark focus:outline-none focus:border-primary text-sm leading-relaxed"
          />
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Protocol</label>
                <select value={buildParts.protocol} onChange={(e) => setBuildParts({ ...buildParts, protocol: e.target.value })} className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm">
                  <option value="https">https</option>
                  <option value="http">http</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Host</label>
                <input type="text" value={buildParts.host} onChange={(e) => setBuildParts({ ...buildParts, host: e.target.value })} placeholder="example.com" className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Path</label>
                <input type="text" value={buildParts.path} onChange={(e) => setBuildParts({ ...buildParts, path: e.target.value })} placeholder="/api/data" className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Query Params (key=value&key2=value2)</label>
                <input type="text" value={buildParts.params} onChange={(e) => setBuildParts({ ...buildParts, params: e.target.value })} placeholder="page=1&sort=name" className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Fragment (hash)</label>
              <input type="text" value={buildParts.hash} onChange={(e) => setBuildParts({ ...buildParts, hash: e.target.value })} placeholder="section-1" className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm" />
            </div>
            <button onClick={buildUrl} className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Build URL</button>
          </div>
        )}
      </div>

      {error && <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4"><p className="text-secondary font-medium text-sm">❌ {error}</p></div>}

      {output && mode !== "parse" && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text dark:text-text-dark">Result</h3>
            <CopyButton text={output} />
          </div>
          <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto max-h-64 leading-relaxed whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}

      {parsed && mode === "parse" && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Parsed URL Components</h3>
          <div className="space-y-2">
            {[
              ["Protocol", parsed.protocol],
              ["Host", parsed.host],
              ["Path", parsed.pathname],
              ["Query String", parsed.search],
              ["Fragment", parsed.hash],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center gap-3 bg-surface-dark rounded-lg p-3">
                <span className="text-sm font-medium text-primary-light min-w-[120px]">{label}</span>
                <span className="text-sm text-text-dark font-mono flex-1 break-all">{val || "(empty)"}</span>
                {val && <CopyButton text={val} label="" />}
              </div>
            ))}
          </div>
          {parsed.params.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-text dark:text-text-dark mb-2">Query Parameters</h4>
              <div className="space-y-1">
                {parsed.params.map(([k, v], i) => (
                  <div key={i} className="flex items-center gap-3 bg-surface-dark rounded-lg p-3">
                    <span className="text-sm font-medium text-primary-light font-mono">{k}</span>
                    <span className="text-text-dark-muted">=</span>
                    <span className="text-sm text-text-dark font-mono flex-1 break-all">{v}</span>
                    <CopyButton text={v} label="" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

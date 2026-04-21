"use client";
import { useState, useMemo } from "react";
import CopyButton from "@/components/ui/CopyButton";

function base64UrlDecode(str: string): string {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return decodeURIComponent(
    atob(b64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts * 1000);
  return d.toLocaleString() + " (" + d.toISOString() + ")";
}

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const decoded = useMemo((): DecodedJwt | null => {
    if (!token.trim()) { setError(""); return null; }
    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) throw new Error("JWT must have 3 parts separated by dots");
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      setError("");
      return { header, payload, signature: parts[2] };
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JWT");
      return null;
    }
  }, [token]);

  const expStatus = useMemo(() => {
    if (!decoded?.payload) return null;
    const exp = decoded.payload.exp as number | undefined;
    if (!exp) return { status: "none", label: "No expiration", color: "text-text-light dark:text-text-dark-muted" };
    const now = Math.floor(Date.now() / 1000);
    if (exp < now) return { status: "expired", label: `Expired ${formatTimestamp(exp)}`, color: "text-secondary" };
    return { status: "valid", label: `Valid until ${formatTimestamp(exp)}`, color: "text-accent" };
  }, [decoded]);

  const timeFields = ["iat", "exp", "nbf"];

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">Paste JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          rows={4}
          className="w-full bg-surface-dark text-text-dark font-mono px-4 py-3 rounded-xl border border-border-dark focus:outline-none focus:border-primary text-sm leading-relaxed break-all"
        />
      </div>

      {error && <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4"><p className="text-secondary font-medium text-sm">{error}</p></div>}

      {decoded && (
        <>
          {expStatus && (
            <div className={`bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md ${expStatus.color}`}>
              <span className="font-medium text-sm">
                {expStatus.status === "expired" ? "⏰ " : expStatus.status === "valid" ? "✅ " : "ℹ️ "}
                {expStatus.label}
              </span>
            </div>
          )}

          <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md" style={{ borderLeftWidth: 4, borderLeftColor: "#ef4444" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium" style={{ color: "#ef4444" }}>Header</h3>
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            </div>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto leading-relaxed whitespace-pre">{JSON.stringify(decoded.header, null, 2)}</pre>
          </div>

          <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md" style={{ borderLeftWidth: 4, borderLeftColor: "#a855f7" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium" style={{ color: "#a855f7" }}>Payload</h3>
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            </div>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto leading-relaxed whitespace-pre">{JSON.stringify(decoded.payload, null, 2)}</pre>
            {timeFields.some((f) => f in decoded.payload) && (
              <div className="mt-3 space-y-1">
                {timeFields.map((f) => {
                  const val = decoded.payload[f] as number | undefined;
                  if (!val) return null;
                  return (
                    <div key={f} className="text-xs text-text-light dark:text-text-dark-muted">
                      <span className="font-mono font-medium">{f}</span>: {formatTimestamp(val)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md" style={{ borderLeftWidth: 4, borderLeftColor: "#3b82f6" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium" style={{ color: "#3b82f6" }}>Signature</h3>
              <CopyButton text={decoded.signature} />
            </div>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto leading-relaxed whitespace-pre-wrap break-all">{decoded.signature}</pre>
            <p className="mt-2 text-xs text-text-light dark:text-text-dark-muted">⚠️ Signature is not verified (client-side only, no secret key used)</p>
          </div>
        </>
      )}
    </div>
  );
}

"use client";
import { useState, useMemo } from "react";
import CopyButton from "@/components/ui/CopyButton";

const presets = [
  { label: "Every minute", cron: "* * * * *" },
  { label: "Every 5 minutes", cron: "*/5 * * * *" },
  { label: "Every 15 minutes", cron: "*/15 * * * *" },
  { label: "Every hour", cron: "0 * * * *" },
  { label: "Every day at midnight", cron: "0 0 * * *" },
  { label: "Every day at noon", cron: "0 12 * * *" },
  { label: "Every Monday at 9 AM", cron: "0 9 * * 1" },
  { label: "Every weekday at 9 AM", cron: "0 9 * * 1-5" },
  { label: "1st of every month", cron: "0 0 1 * *" },
  { label: "Every Sunday at 6 PM", cron: "0 18 * * 0" },
];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function describeCron(parts: string[]): string {
  if (parts.length < 5) return "Invalid cron expression";
  const [min, hour, dom, mon, dow] = parts;
  const pieces: string[] = [];

  if (min === "*" && hour === "*") pieces.push("Every minute");
  else if (min.startsWith("*/")) pieces.push(`Every ${min.slice(2)} minutes`);
  else if (hour === "*") pieces.push(`At minute ${min} of every hour`);
  else if (min === "0" && hour === "*") pieces.push("Every hour");
  else if (hour.startsWith("*/")) pieces.push(`At minute ${min}, every ${hour.slice(2)} hours`);
  else pieces.push(`At ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`);

  if (dom !== "*") pieces.push(`on day ${dom} of the month`);
  if (mon !== "*") {
    const mIdx = parseInt(mon) - 1;
    pieces.push(`in ${mIdx >= 0 && mIdx < 12 ? months[mIdx] : mon}`);
  }
  if (dow !== "*") {
    if (dow === "1-5") pieces.push("on weekdays");
    else if (dow === "0,6") pieces.push("on weekends");
    else {
      const dIdx = parseInt(dow);
      pieces.push(`on ${dIdx >= 0 && dIdx < 7 ? weekdays[dIdx] : dow}`);
    }
  }
  return pieces.join(" ");
}

function getNextRuns(parts: string[], count: number): Date[] {
  if (parts.length < 5) return [];
  const results: Date[] = [];
  const now = new Date();
  const d = new Date(now);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);

  const matchField = (val: string, current: number): boolean => {
    if (val === "*") return true;
    if (val.includes("/")) {
      const [, step] = val.split("/");
      return current % parseInt(step) === 0;
    }
    if (val.includes("-")) {
      const [lo, hi] = val.split("-").map(Number);
      return current >= lo && current <= hi;
    }
    if (val.includes(",")) return val.split(",").map(Number).includes(current);
    return parseInt(val) === current;
  };

  let safety = 0;
  while (results.length < count && safety < 525600) {
    const [min, hour, dom, mon, dow] = parts;
    if (
      matchField(min, d.getMinutes()) &&
      matchField(hour, d.getHours()) &&
      matchField(dom, d.getDate()) &&
      matchField(mon, d.getMonth() + 1) &&
      matchField(dow, d.getDay())
    ) {
      results.push(new Date(d));
    }
    d.setMinutes(d.getMinutes() + 1);
    safety++;
  }
  return results;
}

export default function CronGenerator() {
  const [fields, setFields] = useState(["*", "*", "*", "*", "*"]);
  const [useSeconds, setUseSeconds] = useState(false);
  const [seconds, setSeconds] = useState("*");
  const [manualInput, setManualInput] = useState("");

  const expression = useSeconds ? `${seconds} ${fields.join(" ")}` : fields.join(" ");
  const parts5 = fields;

  const description = useMemo(() => describeCron(parts5), [parts5]);
  const nextRuns = useMemo(() => getNextRuns(parts5, 5), [parts5]);

  const updateField = (i: number, val: string) => {
    const next = [...fields];
    next[i] = val;
    setFields(next);
  };

  const loadPreset = (cron: string) => {
    const p = cron.split(" ");
    setFields(p.slice(0, 5));
  };

  const parseManual = () => {
    const p = manualInput.trim().split(/\s+/);
    if (p.length === 6) {
      setUseSeconds(true);
      setSeconds(p[0]);
      setFields(p.slice(1, 6));
    } else if (p.length === 5) {
      setUseSeconds(false);
      setFields(p);
    }
  };

  const fieldLabels = ["Minute", "Hour", "Day (Month)", "Month", "Day (Week)"];
  const fieldHints = ["0-59", "0-23", "1-31", "1-12", "0-6 (Sun=0)"];

  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Presets</h3>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.cron} onClick={() => loadPreset(p.cron)} className="px-3 py-1.5 text-sm bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-lg text-text-light dark:text-text-dark-muted hover:border-primary hover:text-primary transition-colors">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <label className="flex items-center gap-2 text-sm text-text-light dark:text-text-dark-muted">
            <input type="checkbox" checked={useSeconds} onChange={(e) => setUseSeconds(e.target.checked)} className="rounded" />
            Include seconds field
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
          {useSeconds && (
            <div>
              <label className="block text-xs font-medium text-text dark:text-text-dark mb-1">Second</label>
              <input type="text" value={seconds} onChange={(e) => setSeconds(e.target.value)} className="w-full bg-surface-dark text-text-dark font-mono px-3 py-2 rounded-lg border border-border-dark text-sm text-center" />
              <span className="text-xs text-text-light dark:text-text-dark-muted">0-59</span>
            </div>
          )}
          {fieldLabels.map((label, i) => (
            <div key={i}>
              <label className="block text-xs font-medium text-text dark:text-text-dark mb-1">{label}</label>
              <input type="text" value={fields[i]} onChange={(e) => updateField(i, e.target.value)} className="w-full bg-surface-dark text-text-dark font-mono px-3 py-2 rounded-lg border border-border-dark text-sm text-center" />
              <span className="text-xs text-text-light dark:text-text-dark-muted">{fieldHints[i]}</span>
            </div>
          ))}
        </div>

        <div className="bg-surface-dark rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-dark-muted">Expression</span>
            <CopyButton text={expression} />
          </div>
          <code className="text-xl font-mono text-primary-light font-bold">{expression}</code>
        </div>

        <div className="bg-surface-alt dark:bg-surface-dark-alt rounded-xl p-4 mb-4">
          <span className="text-sm font-medium text-text dark:text-text-dark">Description: </span>
          <span className="text-sm text-text-light dark:text-text-dark-muted">{description}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">Manual Input</label>
          <div className="flex gap-2">
            <input type="text" value={manualInput} onChange={(e) => setManualInput(e.target.value)} placeholder="*/5 * * * *" className="flex-1 bg-surface-dark text-text-dark font-mono px-3 py-2 rounded-lg border border-border-dark text-sm" />
            <button onClick={parseManual} className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-surface rounded-lg transition-colors">Parse</button>
          </div>
        </div>
      </div>

      {nextRuns.length > 0 && (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
          <h3 className="text-sm font-medium text-text dark:text-text-dark mb-3">Next 5 Execution Times</h3>
          <div className="space-y-1">
            {nextRuns.map((d, i) => (
              <div key={i} className="flex items-center gap-3 bg-surface-dark rounded-lg p-3">
                <span className="text-primary-light font-mono text-sm">{i + 1}.</span>
                <span className="text-text-dark font-mono text-sm">{d.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

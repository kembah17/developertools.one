"use client";
import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import TabSwitcher from "@/components/ui/TabSwitcher";

function GradientGenerator() {
  const [type, setType] = useState<"linear" | "radial" | "conic">("linear");
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState([{ color: "#d97706", stop: 0 }, { color: "#ea580c", stop: 100 }]);

  const addColor = () => setColors([...colors, { color: "#059669", stop: 50 }]);
  const removeColor = (i: number) => { if (colors.length > 2) setColors(colors.filter((_, idx) => idx !== i)); };
  const updateColor = (i: number, field: "color" | "stop", val: string | number) => {
    const next = [...colors];
    if (field === "color") next[i].color = val as string;
    else next[i].stop = Number(val);
    setColors(next);
  };

  const stops = colors.map((c) => `${c.color} ${c.stop}%`).join(", ");
  const css = type === "linear" ? `linear-gradient(${angle}deg, ${stops})` : type === "radial" ? `radial-gradient(circle, ${stops})` : `conic-gradient(from ${angle}deg, ${stops})`;
  const fullCss = `background: ${css};`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {(["linear", "radial", "conic"] as const).map((t) => (
          <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 text-sm rounded-lg border capitalize transition-colors ${type === t ? "bg-primary text-surface border-primary" : "bg-surface-alt dark:bg-surface-dark-alt border-border dark:border-border-dark text-text-light dark:text-text-dark-muted hover:border-primary"}`}>{t}</button>
        ))}
      </div>
      {(type === "linear" || type === "conic") && (
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Angle: {angle}°</label>
          <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-primary" />
        </div>
      )}
      <div className="space-y-2">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <input type="color" value={c.color} onChange={(e) => updateColor(i, "color", e.target.value)} className="w-10 h-10 rounded-lg border border-border dark:border-border-dark cursor-pointer" />
            <input type="text" value={c.color} onChange={(e) => updateColor(i, "color", e.target.value)} className="w-24 bg-surface-dark text-text-dark font-mono px-2 py-1 rounded-lg border border-border-dark text-sm" />
            <input type="range" min={0} max={100} value={c.stop} onChange={(e) => updateColor(i, "stop", e.target.value)} className="flex-1 accent-primary" />
            <span className="text-sm text-text-light dark:text-text-dark-muted w-10">{c.stop}%</span>
            {colors.length > 2 && <button onClick={() => removeColor(i)} className="text-secondary hover:text-secondary/80 text-sm">✕</button>}
          </div>
        ))}
        <button onClick={addColor} className="text-sm text-primary hover:underline">+ Add color stop</button>
      </div>
      <div className="w-full h-32 rounded-xl border border-border dark:border-border-dark" style={{ background: css }} />
      <div className="bg-surface-dark rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-dark-muted">CSS</span>
          <CopyButton text={fullCss} />
        </div>
        <code className="text-sm text-text-dark font-mono">{fullCss}</code>
      </div>
    </div>
  );
}

function BoxShadowGenerator() {
  const [shadows, setShadows] = useState([{ x: 4, y: 4, blur: 10, spread: 0, color: "#00000040", inset: false }]);

  const addShadow = () => setShadows([...shadows, { x: 2, y: 2, blur: 8, spread: 0, color: "#00000030", inset: false }]);
  const removeShadow = (i: number) => { if (shadows.length > 1) setShadows(shadows.filter((_, idx) => idx !== i)); };
  const update = (i: number, field: string, val: number | string | boolean) => {
    const next = [...shadows];
    (next[i] as Record<string, unknown>)[field] = val;
    setShadows(next);
  };

  const css = shadows.map((s) => `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(", ");
  const fullCss = `box-shadow: ${css};`;

  return (
    <div className="space-y-4">
      {shadows.map((s, i) => (
        <div key={i} className="bg-surface-alt dark:bg-surface-dark-alt rounded-xl p-4 border border-border dark:border-border-dark">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text dark:text-text-dark">Shadow {i + 1}</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark-muted">
                <input type="checkbox" checked={s.inset} onChange={(e) => update(i, "inset", e.target.checked)} /> Inset
              </label>
              {shadows.length > 1 && <button onClick={() => removeShadow(i)} className="text-secondary text-sm">✕</button>}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["x", "y", "blur", "spread"] as const).map((f) => (
              <div key={f}>
                <label className="block text-xs text-text-light dark:text-text-dark-muted mb-1 capitalize">{f === "x" ? "Offset X" : f === "y" ? "Offset Y" : f}: {s[f]}px</label>
                <input type="range" min={f === "x" || f === "y" ? -50 : f === "spread" ? -20 : 0} max={f === "x" || f === "y" ? 50 : 100} value={s[f]} onChange={(e) => update(i, f, Number(e.target.value))} className="w-full accent-primary" />
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input type="color" value={s.color.slice(0, 7)} onChange={(e) => update(i, "color", e.target.value + "40")} className="w-8 h-8 rounded border border-border dark:border-border-dark cursor-pointer" />
            <input type="text" value={s.color} onChange={(e) => update(i, "color", e.target.value)} className="w-28 bg-surface-dark text-text-dark font-mono px-2 py-1 rounded-lg border border-border-dark text-sm" />
          </div>
        </div>
      ))}
      <button onClick={addShadow} className="text-sm text-primary hover:underline">+ Add shadow</button>
      <div className="flex items-center justify-center p-8">
        <div className="w-48 h-48 bg-surface dark:bg-surface-dark rounded-xl border border-border dark:border-border-dark" style={{ boxShadow: css }} />
      </div>
      <div className="bg-surface-dark rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-dark-muted">CSS</span>
          <CopyButton text={fullCss} />
        </div>
        <code className="text-sm text-text-dark font-mono break-all">{fullCss}</code>
      </div>
    </div>
  );
}

function FlexboxGenerator() {
  const [dir, setDir] = useState("row");
  const [wrap, setWrap] = useState("nowrap");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [gap, setGap] = useState(8);
  const [items, setItems] = useState(4);

  const css = `display: flex;
flex-direction: ${dir};
flex-wrap: ${wrap};
justify-content: ${justify};
align-items: ${align};
gap: ${gap}px;`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Direction</label>
          <select value={dir} onChange={(e) => setDir(e.target.value)} className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm">
            {["row", "row-reverse", "column", "column-reverse"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Wrap</label>
          <select value={wrap} onChange={(e) => setWrap(e.target.value)} className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm">
            {["nowrap", "wrap", "wrap-reverse"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Justify Content</label>
          <select value={justify} onChange={(e) => setJustify(e.target.value)} className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm">
            {["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Align Items</label>
          <select value={align} onChange={(e) => setAlign(e.target.value)} className="w-full bg-surface-dark text-text-dark px-3 py-2 rounded-lg border border-border-dark text-sm">
            {["stretch", "flex-start", "flex-end", "center", "baseline"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Gap: {gap}px</label>
          <input type="range" min={0} max={40} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">Items: {items}</label>
          <input type="range" min={1} max={12} value={items} onChange={(e) => setItems(Number(e.target.value))} className="w-full accent-primary" />
        </div>
      </div>
      <div className="bg-surface-alt dark:bg-surface-dark-alt rounded-xl p-4 border border-border dark:border-border-dark min-h-[200px]" style={{ display: "flex", flexDirection: dir as React.CSSProperties["flexDirection"], flexWrap: wrap as React.CSSProperties["flexWrap"], justifyContent: justify, alignItems: align, gap: `${gap}px` }}>
        {Array.from({ length: items }, (_, i) => (
          <div key={i} className="bg-primary text-surface rounded-lg px-4 py-3 text-sm font-medium min-w-[60px] text-center">
            {i + 1}
          </div>
        ))}
      </div>
      <div className="bg-surface-dark rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-dark-muted">CSS</span>
          <CopyButton text={css} />
        </div>
        <pre className="text-sm text-text-dark font-mono whitespace-pre">{css}</pre>
      </div>
    </div>
  );
}

export default function CssGenerator() {
  const [tab, setTab] = useState("gradient");
  return (
    <div className="space-y-4">
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-4 shadow-md">
        <TabSwitcher tabs={[
          { id: "gradient", label: "Gradient" },
          { id: "shadow", label: "Box Shadow" },
          { id: "flexbox", label: "Flexbox" },
        ]} active={tab} onChange={setTab} />
        <div className="mt-4">
          {tab === "gradient" && <GradientGenerator />}
          {tab === "shadow" && <BoxShadowGenerator />}
          {tab === "flexbox" && <FlexboxGenerator />}
        </div>
      </div>
    </div>
  );
}

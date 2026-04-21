"use client";

export default function TabSwitcher({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-surface-alt dark:bg-surface-dark-alt rounded-xl border border-border dark:border-border-dark">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => onChange(tab.id)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          active === tab.id
            ? "bg-primary text-surface shadow-sm"
            : "text-text-light dark:text-text-dark-muted hover:text-primary hover:bg-surface dark:hover:bg-surface-dark"
        }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

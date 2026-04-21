"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const tools = [
  { name: "JSON Formatter", href: "/json-formatter" },
  { name: "Regex Tester", href: "/regex-tester" },
  { name: "Base64", href: "/base64-encoder-decoder" },
  { name: "URL Encode", href: "/url-encoder-decoder" },
  { name: "HTML Formatter", href: "/html-formatter" },
  { name: "CSS Generator", href: "/css-generator" },
  { name: "JS Minifier", href: "/javascript-minifier" },
  { name: "SQL Formatter", href: "/sql-formatter" },
  { name: "Cron Generator", href: "/cron-expression-generator" },
  { name: "JWT Decoder", href: "/jwt-decoder" },
  { name: "UUID Generator", href: "/uuid-generator" },
  { name: "Hash Generator", href: "/hash-generator" },
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">⚡</span>
            <span>DevTools<span className="text-secondary">.run</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {tools.slice(0, 6).map((t) => (
              <Link key={t.href} href={t.href} className="px-3 py-2 text-sm font-medium text-text-light dark:text-text-dark-muted hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark-alt transition-colors">
                {t.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-text-light dark:text-text-dark-muted hover:text-primary rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark-alt transition-colors">
                More ▾
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {tools.slice(6).map((t) => (
                  <Link key={t.href} href={t.href} className="block px-4 py-2 text-sm text-text-light dark:text-text-dark-muted hover:text-primary hover:bg-surface-alt dark:hover:bg-surface-dark-alt first:rounded-t-xl last:rounded-b-xl transition-colors">
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleDark} className="relative w-14 h-7 rounded-full bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark transition-colors" aria-label="Toggle dark mode">
              <span className={`absolute top-0.5 w-6 h-6 rounded-full transition-all flex items-center justify-center text-sm ${dark ? "left-7 bg-primary-dark" : "left-0.5 bg-primary"}`}>
                {dark ? "🌙" : "☀️"}
              </span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-text-light dark:text-text-dark-muted hover:text-primary" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
          <div className="px-4 py-3 space-y-1">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-text-light dark:text-text-dark-muted hover:text-primary rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark-alt transition-colors">
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

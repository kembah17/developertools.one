import Link from "next/link";

const toolLinks = [
  { name: "JSON Formatter", href: "/json-formatter" },
  { name: "Regex Tester", href: "/regex-tester" },
  { name: "Base64 Encode/Decode", href: "/base64-encoder-decoder" },
  { name: "URL Encode/Decode", href: "/url-encoder-decoder" },
  { name: "HTML Formatter", href: "/html-formatter" },
  { name: "CSS Generator", href: "/css-generator" },
  { name: "JS Minifier", href: "/javascript-minifier" },
  { name: "SQL Formatter", href: "/sql-formatter" },
  { name: "Cron Generator", href: "/cron-expression-generator" },
  { name: "JWT Decoder", href: "/jwt-decoder" },
  { name: "UUID Generator", href: "/uuid-generator" },
  { name: "Hash Generator", href: "/hash-generator" },
];

const articleLinks = [
  { name: "How to Format JSON", href: "/how-to-format-json" },
  { name: "Regex Cheat Sheet", href: "/regex-cheat-sheet" },
  { name: "Base64 Encoding Explained", href: "/base64-encoding-explained" },
  { name: "Cron Expression Guide", href: "/cron-expression-guide" },
  { name: "JWT Tokens Explained", href: "/jwt-tokens-explained" },
  { name: "SQL Formatting Best Practices", href: "/sql-formatting-best-practices" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-text-dark mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-primary-light">⚡ DevTools.run</Link>
            <p className="mt-3 text-sm text-text-dark-muted">Free online developer tools. 100% client-side processing — your data never leaves your browser.</p>
          </div>
          <div>
            <h3 className="font-semibold text-text-dark mb-3">Tools</h3>
            <ul className="space-y-2">
              {toolLinks.slice(0, 6).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-text-dark-muted hover:text-primary-light transition-colors">{l.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text-dark mb-3">More Tools</h3>
            <ul className="space-y-2">
              {toolLinks.slice(6).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-text-dark-muted hover:text-primary-light transition-colors">{l.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text-dark mb-3">Resources</h3>
            <ul className="space-y-2">
              {articleLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-text-dark-muted hover:text-primary-light transition-colors">{l.name}</Link></li>
              ))}
              <li><Link href="/about" className="text-sm text-text-dark-muted hover:text-primary-light transition-colors">About</Link></li>
              <li><Link href="/privacy" className="text-sm text-text-dark-muted hover:text-primary-light transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-text-dark-muted hover:text-primary-light transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border-dark text-center text-sm text-text-dark-muted">
          <p>© {new Date().getFullYear()} DevTools.run — All tools run 100% in your browser. No data is ever sent to any server.</p>
        </div>
      </div>
    </footer>
  );
}

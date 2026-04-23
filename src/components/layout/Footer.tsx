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
    <footer style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }} className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold" style={{ color: 'var(--color-footer-link)' }}>⚡ DeveloperTools.one</Link>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-footer-muted)' }}>Free online developer tools. 100% client-side processing — your data never leaves your browser.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--color-footer-text)' }}>Tools</h3>
            <ul className="space-y-2">
              {toolLinks.slice(0, 6).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>{l.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--color-footer-text)' }}>More Tools</h3>
            <ul className="space-y-2">
              {toolLinks.slice(6).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>{l.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--color-footer-text)' }}>Resources</h3>
            <ul className="space-y-2">
              {articleLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>{l.name}</Link></li>
              ))}
              <li><Link href="/about" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>About</Link></li>
              <li><Link href="/privacy" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>Privacy</Link></li>
              <li><Link href="/terms" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 text-center text-sm" style={{ borderTop: '1px solid var(--color-footer-border)', color: 'var(--color-footer-muted)' }}>
          <p>© {new Date().getFullYear()} DeveloperTools.one — All tools run 100% in your browser. No data is ever sent to any server.</p>
        </div>
      </div>
    </footer>
  );
}

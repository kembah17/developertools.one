import Link from "next/link";

const toolLinks = [
  { name: "JSON Formatter", href: "/json-formatter", icon: "📋" },
  { name: "Regex Tester", href: "/regex-tester", icon: "🔍" },
  { name: "Base64 Encode/Decode", href: "/base64-encoder-decoder", icon: "🔐" },
  { name: "URL Encode/Decode", href: "/url-encoder-decoder", icon: "🔗" },
  { name: "HTML Formatter", href: "/html-formatter", icon: "🌐" },
  { name: "CSS Generator", href: "/css-generator", icon: "🎨" },
  { name: "JS Minifier", href: "/javascript-minifier", icon: "📦" },
  { name: "SQL Formatter", href: "/sql-formatter", icon: "🗃️" },
  { name: "Cron Generator", href: "/cron-expression-generator", icon: "⏰" },
  { name: "JWT Decoder", href: "/jwt-decoder", icon: "🔓" },
  { name: "UUID Generator", href: "/uuid-generator", icon: "🆔" },
  { name: "Hash Generator", href: "/hash-generator", icon: "#️⃣" },
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
    <footer style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <div>
            <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-footer-link)', textDecoration: 'none' }}>⚡ DeveloperTools.one</Link>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--color-footer-muted)', lineHeight: 1.6 }}>Free online developer tools. 100% client-side processing — your data never leaves your browser.</p>
          </div>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-footer-text)' }}>Tools</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {toolLinks.slice(0, 6).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '0.875rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>
                    {l.icon} {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-footer-text)' }}>More Tools</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {toolLinks.slice(6).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '0.875rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>
                    {l.icon} {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-footer-text)' }}>Resources</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {articleLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '0.875rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>
                    {l.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/about" style={{ fontSize: '0.875rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>About</Link></li>
              <li><Link href="/privacy" style={{ fontSize: '0.875rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>Privacy</Link></li>
              <li><Link href="/terms" style={{ fontSize: '0.875rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>Terms</Link></li>
            </ul>
          </div>
        </div>
                {/* More Free Tools */}
        <div style={{ borderTop: '1px solid var(--color-footer-border)', marginTop: '2rem', paddingTop: '1.5rem' }}>
          <h4 style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-footer-text)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>More Free Tools</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem' }}>
            <a href="https://pdftools.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>📄 PDF Tools</a>
            <a href="https://pictools.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🖼️ Image Tools</a>
            <a href="https://percentcalc.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🔢 Percentage Calculator</a>
            <a href="https://wordcount.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>📝 Word Counter</a>
            <a href="https://texttools.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🔤 Text Tools</a>
            <a href="https://socialmediatools.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>📱 Social Media Tools</a>
            <a href="https://randomize.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🎲 Random Generator</a>
            <a href="https://qrcodegenerator.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>📲 QR Code Generator</a>
            <a href="https://gpacalculator.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🎓 GPA Calculator</a>
            <a href="https://invoicegenerator.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🧾 Invoice Generator</a>
            <a href="https://caloriecalculator.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🔥 Calorie Calculator</a>
            <a href="https://passwordgenerator.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>🔐 Password Generator</a>
            <a href="https://datecalculator.one" target="_blank" rel="noopener" style={{ fontSize: '0.8125rem', color: 'var(--color-footer-muted)', textDecoration: 'none' }}>📅 Date Calculator</a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-footer-border)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--color-footer-muted)' }}>
          <p>© {new Date().getFullYear()} DeveloperTools.one — All tools run 100% in your browser. No data is ever sent to any server.</p>
        </div>
      </div>
    </footer>
  );
}

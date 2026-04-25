import AdSlot from "@/components/ui/AdSlot";
import HomeToolGrid from "@/components/ui/HomeToolGrid";
import ArticleGrid from "@/components/ui/ArticleGrid";

const tools = [
  { name: "JSON Formatter", desc: "Format, validate, and beautify JSON with tree view and syntax highlighting.", href: "/json-formatter", icon: "📋" },
  { name: "Regex Tester", desc: "Test regex patterns with real-time match highlighting and pattern library.", href: "/regex-tester", icon: "🔍" },
  { name: "Base64 Encode/Decode", desc: "Encode and decode Base64 strings and files with drag & drop support.", href: "/base64-encoder-decoder", icon: "🔐" },
  { name: "URL Encode/Decode", desc: "Encode, decode, and parse URLs with component breakdown.", href: "/url-encoder-decoder", icon: "🔗" },
  { name: "HTML Formatter", desc: "Beautify and minify HTML code with proper indentation.", href: "/html-formatter", icon: "🌐" },
  { name: "CSS Generator", desc: "Generate gradients, box shadows, and flexbox layouts visually.", href: "/css-generator", icon: "🎨" },
  { name: "JS Minifier", desc: "Minify JavaScript code and see size reduction percentage.", href: "/javascript-minifier", icon: "📦" },
  { name: "SQL Formatter", desc: "Format SQL queries with dialect support and keyword capitalization.", href: "/sql-formatter", icon: "🗃️" },
  { name: "Cron Generator", desc: "Build cron expressions visually with human-readable descriptions.", href: "/cron-expression-generator", icon: "⏰" },
  { name: "JWT Decoder", desc: "Decode JWT tokens and inspect header, payload, and expiration.", href: "/jwt-decoder", icon: "🔓" },
  { name: "UUID Generator", desc: "Generate UUID v4 with bulk generation and format options.", href: "/uuid-generator", icon: "🆔" },
  { name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or files.", href: "/hash-generator", icon: "#️⃣" },
];

const articles = [
  { title: "How to Format JSON", desc: "Complete guide to JSON formatting, validation, and common errors.", href: "/how-to-format-json" },
  { title: "Regex Cheat Sheet", desc: "Comprehensive regex reference with examples for common patterns.", href: "/regex-cheat-sheet" },
  { title: "Base64 Encoding Explained", desc: "What is Base64, how it works, and when to use it.", href: "/base64-encoding-explained" },
  { title: "Cron Expression Guide", desc: "Complete guide to cron syntax with examples for common schedules.", href: "/cron-expression-guide" },
  { title: "JWT Tokens Explained", desc: "Understanding JWT structure, use cases, and security best practices.", href: "/jwt-tokens-explained" },
  { title: "SQL Formatting Best Practices", desc: "SQL style guide with naming conventions and optimization tips.", href: "/sql-formatting-best-practices" },
];

export default function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '3rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: 'var(--color-text-heading)',
          marginBottom: '1.5rem',
          lineHeight: 1.2,
        }}>
          Free Online <span style={{ color: 'var(--color-brand)' }}>Developer Tools</span>
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '48rem',
          margin: '0 auto 2rem',
          lineHeight: 1.7,
        }}>
          12 essential developer tools that run 100% in your browser. Format JSON, test regex, encode Base64, generate UUIDs, decode JWTs, and more — all free, fast, and private.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-brand)', fontWeight: 500 }}>
          <span style={{ fontSize: '1.125rem' }}>🔒</span>
          <span>All processing happens in your browser. No data is sent to any server.</span>
        </div>
      </section>

      <AdSlot slot="home-top" />

      {/* Tools Grid */}
      <section style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '2rem', textAlign: 'center' }}>Developer Tools</h2>
        <HomeToolGrid tools={tools} />
      </section>

      <AdSlot slot="home-mid" />

      {/* Articles */}
      <section style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '2rem', textAlign: 'center' }}>Developer Guides & References</h2>
        <ArticleGrid articles={articles} />
      </section>

      <AdSlot slot="home-bottom" />
    </div>
  );
}

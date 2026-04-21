import Link from "next/link";
import AdSlot from "@/components/ui/AdSlot";

const tools = [
  { name: "JSON Formatter", desc: "Format, validate, and beautify JSON with tree view and syntax highlighting.", href: "/json-formatter", icon: "{ }" },
  { name: "Regex Tester", desc: "Test regex patterns with real-time match highlighting and pattern library.", href: "/regex-tester", icon: ".*" },
  { name: "Base64 Encode/Decode", desc: "Encode and decode Base64 strings and files with drag & drop support.", href: "/base64-encoder-decoder", icon: "B64" },
  { name: "URL Encode/Decode", desc: "Encode, decode, and parse URLs with component breakdown.", href: "/url-encoder-decoder", icon: "%20" },
  { name: "HTML Formatter", desc: "Beautify and minify HTML code with proper indentation.", href: "/html-formatter", icon: "</>" },
  { name: "CSS Generator", desc: "Generate gradients, box shadows, and flexbox layouts visually.", href: "/css-generator", icon: "#{}" },
  { name: "JS Minifier", desc: "Minify JavaScript code and see size reduction percentage.", href: "/javascript-minifier", icon: "JS" },
  { name: "SQL Formatter", desc: "Format SQL queries with dialect support and keyword capitalization.", href: "/sql-formatter", icon: "SQL" },
  { name: "Cron Generator", desc: "Build cron expressions visually with human-readable descriptions.", href: "/cron-expression-generator", icon: "⏰" },
  { name: "JWT Decoder", desc: "Decode JWT tokens and inspect header, payload, and expiration.", href: "/jwt-decoder", icon: "JWT" },
  { name: "UUID Generator", desc: "Generate UUID v4 with bulk generation and format options.", href: "/uuid-generator", icon: "ID" },
  { name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or files.", href: "/hash-generator", icon: "#" },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text dark:text-text-dark mb-6">
          Free Online <span className="text-primary">Developer Tools</span>
        </h1>
        <p className="text-lg sm:text-xl text-text-light dark:text-text-dark-muted max-w-3xl mx-auto mb-8">
          12 essential developer tools that run 100% in your browser. Format JSON, test regex, encode Base64, generate UUIDs, decode JWTs, and more — all free, fast, and private.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-accent dark:text-accent font-medium">
          <span className="text-lg">🔒</span>
          <span>All processing happens in your browser. No data is sent to any server.</span>
        </div>
      </section>

      <AdSlot slot="home-top" />

      {/* Tools Grid */}
      <section className="mt-12 mb-16">
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-8 text-center">Developer Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-5 shadow-md hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary font-mono font-bold text-lg mb-3 group-hover:bg-primary group-hover:text-surface transition-colors">
                {tool.icon}
              </div>
              <h3 className="font-semibold text-text dark:text-text-dark mb-1.5 group-hover:text-primary transition-colors">{tool.name}</h3>
              <p className="text-sm text-text-light dark:text-text-dark-muted leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="home-mid" />

      {/* Articles */}
      <section className="mt-12 mb-16">
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-8 text-center">Developer Guides & References</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <Link key={a.href} href={a.href} className="group bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-5 shadow-md hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all">
              <h3 className="font-semibold text-text dark:text-text-dark mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
              <p className="text-sm text-text-light dark:text-text-dark-muted leading-relaxed">{a.desc}</p>
              <span className="inline-block mt-3 text-sm font-medium text-primary group-hover:underline">Read more →</span>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="home-bottom" />
    </div>
  );
}

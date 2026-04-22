import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DeveloperTools.one — Free Online Developer Tools Suite",
  description: "DeveloperTools.one provides 12 free, privacy-focused developer tools that run entirely in your browser. No data is ever sent to a server.",
};

export default function AboutPage() {
  const tools = [
    { name: "JSON Formatter & Validator", href: "/json-formatter", desc: "Format, validate, and minify JSON with tree view and syntax highlighting" },
    { name: "Regex Tester", href: "/regex-tester", desc: "Test regular expressions with real-time match highlighting and pattern library" },
    { name: "Base64 Encode/Decode", href: "/base64-encoder-decoder", desc: "Encode and decode Base64 text and files with URL-safe support" },
    { name: "URL Encode/Decode", href: "/url-encoder-decoder", desc: "Encode, decode, and parse URLs with component breakdown" },
    { name: "HTML Formatter", href: "/html-formatter", desc: "Beautify and minify HTML code with proper indentation" },
    { name: "CSS Generator", href: "/css-generator", desc: "Generate gradients, box shadows, and flexbox layouts visually" },
    { name: "JavaScript Minifier", href: "/javascript-minifier", desc: "Minify JavaScript code with size reduction statistics" },
    { name: "SQL Formatter", href: "/sql-formatter", desc: "Format SQL queries with dialect support and keyword capitalization" },
    { name: "Cron Expression Generator", href: "/cron-expression-generator", desc: "Build cron schedules visually with presets and execution preview" },
    { name: "JWT Decoder", href: "/jwt-decoder", desc: "Decode JWT tokens to inspect headers, payloads, and expiration" },
    { name: "UUID Generator", href: "/uuid-generator", desc: "Generate UUID v4 tokens in bulk with format options" },
    { name: "Hash Generator", href: "/hash-generator", desc: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-6">About DeveloperTools.one</h1>

      <div className="space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
        <p className="text-lg">DeveloperTools.one is a free suite of 12 essential developer tools designed for speed, privacy, and simplicity. Every tool runs entirely in your browser — no data is ever uploaded to a server, no accounts are required, and there are no usage limits.</p>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">Our Mission</h2>
          <p>We believe developer tools should be fast, free, and private. Too many online tools require sign-ups, send your data to remote servers, or limit usage behind paywalls. DeveloperTools.one takes a different approach: every computation happens locally in your browser using JavaScript. Your code, data, and tokens never leave your device.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">Why Client-Side Processing?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Privacy First</strong> — Your data stays on your device. We cannot see, store, or access anything you process.</li>
            <li><strong>Instant Speed</strong> — No network round-trips. Results appear as you type.</li>
            <li><strong>Works Offline</strong> — Once loaded, most tools work without an internet connection.</li>
            <li><strong>No Limits</strong> — Process as much data as your browser can handle. No rate limits or quotas.</li>
            <li><strong>No Accounts</strong> — No sign-up, no login, no tracking. Just open and use.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">Our Tools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="block bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4 hover:border-primary transition-colors">
                <h3 className="font-bold text-text dark:text-text-dark text-sm">{tool.name}</h3>
                <p className="text-xs mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">Technology</h2>
          <p>DeveloperTools.one is built with modern web technologies for optimal performance:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Next.js</strong> — React framework for fast page loads and SEO optimization</li>
            <li><strong>TypeScript</strong> — Type-safe code for reliability</li>
            <li><strong>Tailwind CSS</strong> — Responsive design that works on all devices</li>
            <li><strong>Web APIs</strong> — Leveraging browser-native capabilities for maximum performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">Contact</h2>
          <p>Have feedback, feature requests, or found a bug? We would love to hear from you. Reach out at <a href="mailto:hello@developertools.one" className="text-primary hover:underline">hello@developertools.one</a>.</p>
        </section>
      </div>
    </div>
  );
}

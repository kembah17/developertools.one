import type { Metadata } from "next";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Base64 Encoding Explained — How It Works, When to Use It & Security Guide",
  description: "Complete guide to Base64 encoding. Learn how Base64 works, when to use it, common use cases, security considerations, and implementation in JavaScript, Python, and more.",
  keywords: ["Base64 encoding", "Base64 decode", "what is Base64", "Base64 explained", "Base64 tutorial"],
};

const faqs = [
  { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, /). It converts every 3 bytes of binary data into 4 ASCII characters, making binary data safe for text-based systems like email, JSON, HTML, and URLs." },
  { question: "Is Base64 encryption?", answer: "No, Base64 is NOT encryption. It is an encoding scheme that is completely reversible without any key. Anyone can decode Base64 data. Never use Base64 to protect sensitive information — use proper encryption algorithms like AES-256 or RSA instead." },
  { question: "Why does Base64 increase file size?", answer: "Base64 encoding increases data size by approximately 33% because it converts every 3 bytes into 4 characters. Additionally, when used in JSON or XML, the encoded string may need further escaping, adding more overhead. This is the trade-off for text-safe representation." },
  { question: "When should I use Base64 encoding?", answer: "Use Base64 when you need to embed binary data in text-based formats: embedding images in HTML/CSS (data URIs), sending binary attachments in JSON APIs, encoding data in URLs, email attachments (MIME), and storing binary data in text-only databases or configuration files." },
  { question: "What is the difference between Base64 and URL-safe Base64?", answer: "Standard Base64 uses + and / characters which have special meaning in URLs. URL-safe Base64 (also called Base64url) replaces + with - and / with _, making it safe for use in URLs and filenames without additional encoding. JWT tokens use URL-safe Base64." },
  { question: "How do I Base64 encode in JavaScript?", answer: "In browsers, use btoa() to encode and atob() to decode. For Node.js, use Buffer.from(string).toString(\"base64\") to encode and Buffer.from(base64String, \"base64\").toString() to decode. For binary data or Unicode, you may need TextEncoder/TextDecoder." },
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="prose-custom">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-4">Base64 Encoding Explained: How It Works, When to Use It & Security Guide</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg mb-8">A comprehensive guide to understanding Base64 encoding, its mechanics, practical applications, and important security considerations.</p>

        <AdSlot slot="article-top" />

        <div className="mt-8 space-y-8 text-text dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">What is Base64 Encoding?</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. The name "Base64" comes from the fact that it uses 64 different ASCII characters to represent data: the uppercase letters A-Z (26), lowercase letters a-z (26), digits 0-9 (10), and two additional characters + and / (2), totaling 64 characters.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Base64 was originally designed for sending binary data through systems that only support text, such as email (MIME) and early internet protocols. Today, it is used extensively in web development for embedding images in HTML/CSS, encoding data in URLs, transmitting binary data in JSON APIs, and storing binary content in text-based databases.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">The encoding process takes every 3 bytes (24 bits) of input data and splits them into 4 groups of 6 bits each. Each 6-bit group maps to one of the 64 characters in the Base64 alphabet. If the input length is not a multiple of 3, padding characters (=) are added to the output.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How Base64 Encoding Works</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Let us walk through encoding the text "Hi!" step by step:</p>
            <div className="bg-surface-dark rounded-xl p-4 mb-4">
              <div className="space-y-3 text-sm font-mono text-text-dark">
                <div><span className="text-primary-light">Step 1:</span> Convert to ASCII bytes</div>
                <div className="pl-4">H = 72, i = 105, ! = 33</div>
                <div><span className="text-primary-light">Step 2:</span> Convert to binary (8 bits each)</div>
                <div className="pl-4">01001000 01101001 00100001</div>
                <div><span className="text-primary-light">Step 3:</span> Split into 6-bit groups</div>
                <div className="pl-4">010010 000110 100100 100001</div>
                <div><span className="text-primary-light">Step 4:</span> Convert to decimal</div>
                <div className="pl-4">18, 6, 36, 33</div>
                <div><span className="text-primary-light">Step 5:</span> Map to Base64 alphabet</div>
                <div className="pl-4">S, G, k, h</div>
                <div className="mt-2 text-primary-light font-bold">Result: "Hi!" → "SGkh"</div>
              </div>
            </div>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">The Base64 alphabet is: <code className="bg-surface-dark text-primary-light px-2 py-0.5 rounded font-mono text-sm">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/</code></p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">Where A=0, B=1, C=2, ... Z=25, a=26, b=27, ... z=51, 0=52, 1=53, ... 9=61, +=62, /=63.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Padding in Base64</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Since Base64 processes data in 3-byte chunks, input that is not a multiple of 3 bytes requires padding. The = character is used as padding:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-light dark:text-text-dark-muted">
              <li><strong>Input length % 3 == 0:</strong> No padding needed (e.g., "Hi!" → "SGkh")</li>
              <li><strong>Input length % 3 == 1:</strong> Two padding characters added (e.g., "H" → "SA==")</li>
              <li><strong>Input length % 3 == 2:</strong> One padding character added (e.g., "Hi" → "SGk=")</li>
            </ul>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mt-4">Some implementations (like URL-safe Base64) omit padding since the decoder can infer the original length from the encoded string length.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Base64 in JavaScript</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JavaScript provides built-in functions for Base64 encoding and decoding:</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`// Browser: btoa() and atob()
const encoded = btoa("Hello, World!"); // "SGVsbG8sIFdvcmxkIQ=="
const decoded = atob("SGVsbG8sIFdvcmxkIQ=="); // "Hello, World!"

// Handle Unicode (btoa only supports Latin1)
function encodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(parseInt(p1, 16))
  ));
}

// Node.js: Buffer
const encoded = Buffer.from("Hello").toString("base64");
const decoded = Buffer.from(encoded, "base64").toString("utf-8");

// URL-safe Base64
function toBase64Url(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromBase64Url(base64url) {
  let b64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return b64;
}`}</code></pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Base64 in Python</h2>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`import base64

# Encode
encoded = base64.b64encode(b"Hello, World!").decode("utf-8")
print(encoded)  # SGVsbG8sIFdvcmxkIQ==

# Decode
decoded = base64.b64decode("SGVsbG8sIFdvcmxkIQ==").decode("utf-8")
print(decoded)  # Hello, World!

# URL-safe Base64
url_safe = base64.urlsafe_b64encode(b"Hello").decode("utf-8")
decoded = base64.urlsafe_b64decode(url_safe).decode("utf-8")

# Encode a file
with open("image.png", "rb") as f:
    encoded = base64.b64encode(f.read()).decode("utf-8")
    data_uri = f"data:image/png;base64,{encoded}"`}</code></pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Common Use Cases for Base64</h2>
            <div className="space-y-4">
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">1. Data URIs in HTML/CSS</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm mb-2">Embed small images directly in HTML or CSS to reduce HTTP requests:</p>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono overflow-auto"><code>{`<img src="data:image/png;base64,iVBORw0KGgo..." />

.icon { background-image: url(data:image/svg+xml;base64,PHN2Zy...); }`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">2. JSON API Payloads</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm mb-2">Send binary data (files, images) in JSON which only supports text:</p>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono overflow-auto"><code>{`{ "filename": "report.pdf", "content": "JVBERi0xLjQK..." }`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">3. JWT Tokens</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm">JSON Web Tokens use URL-safe Base64 to encode the header and payload sections, making them safe for use in HTTP headers and URLs.</p>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">4. Email Attachments (MIME)</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm">Email protocols (SMTP) are text-based, so binary attachments are Base64-encoded in MIME format. This is how every email attachment you have ever sent works.</p>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">5. Basic HTTP Authentication</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm">HTTP Basic Auth encodes username:password in Base64 for the Authorization header. Note: this is NOT secure without HTTPS since Base64 is trivially decodable.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Security Considerations</h2>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-4">
              <p className="text-secondary font-bold mb-2">⚠️ Critical Warning</p>
              <p className="text-text-light dark:text-text-dark-muted">Base64 is NOT encryption. It provides ZERO security. Anyone can decode Base64 data instantly. Never use Base64 to hide passwords, API keys, personal data, or any sensitive information.</p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-text-light dark:text-text-dark-muted">
              <li><strong>Base64 is reversible</strong> — No key is needed to decode. It is a simple encoding, not encryption.</li>
              <li><strong>Do not use for passwords</strong> — Use bcrypt, scrypt, or Argon2 for password hashing.</li>
              <li><strong>Do not use for API keys</strong> — Store secrets in environment variables or secret managers.</li>
              <li><strong>HTTPS is still required</strong> — Base64-encoded data in transit is just as vulnerable as plaintext without TLS.</li>
              <li><strong>Size overhead</strong> — Base64 adds ~33% size overhead. For large files, consider binary transfer instead.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Base64 Variants</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light">Variant</th>
                    <th className="text-left px-4 py-2 text-text-dark">Characters</th>
                    <th className="text-left px-4 py-2 text-text-dark">Use Case</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono">Standard (RFC 4648)</td><td className="px-4 py-2">A-Z, a-z, 0-9, +, /</td><td className="px-4 py-2">General purpose, MIME</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono">URL-safe (RFC 4648)</td><td className="px-4 py-2">A-Z, a-z, 0-9, -, _</td><td className="px-4 py-2">URLs, filenames, JWT</td></tr>
                  <tr><td className="px-4 py-2 font-mono">Base32</td><td className="px-4 py-2">A-Z, 2-7</td><td className="px-4 py-2">Case-insensitive contexts, TOTP</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6">
            <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">Try Our Base64 Encoder/Decoder</h2>
            <p className="text-text-light dark:text-text-dark-muted mb-4">Encode and decode Base64 data instantly with our free online tool. Supports text, files, and URL-safe Base64.</p>
            <Link href="/base64-encoder-decoder" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-surface font-medium rounded-lg transition-colors">Open Base64 Tool →</Link>
          </div>
        </div>

        <AdSlot slot="article-bottom" />
      </article>
      <FaqSchema faqs={faqs} />
    </div>
  );
}

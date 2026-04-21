import type { Metadata } from "next";
import UrlTool from "@/components/tools/UrlTool";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "URL Encode & Decode — Free Online URL Encoder/Decoder & Parser",
  description: "Free online URL encoder and decoder. Encode text for URLs, decode URL-encoded strings, parse URLs into components, and build URLs from parts.",
  keywords: ["URL encode", "URL decode", "URL encoder", "URL decoder", "URL parser", "encodeURIComponent"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">URL Encode & Decode</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Encode, decode, parse, and build URLs with component-level control.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="url-top" /></div>
      <div className="mt-6"><UrlTool /></div>
      <div className="mt-8"><AdSlot slot="url-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About URL Encoding</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">URL encoding converts characters into a format that can be transmitted over the Internet. Special characters are replaced with percent-encoded values (e.g., space becomes %20). This tool supports both encodeURIComponent (for query parameters) and encodeURI (for full URLs).</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/base64-encoder-decoder" className="text-primary hover:underline">Base64 Encode/Decode</Link></li>
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter</Link></li>
          <li><Link href="/hash-generator" className="text-primary hover:underline">Hash Generator</Link></li>
        </ul>
      </div>
      <JsonLd name="URL Encoder & Decoder" description="Free online URL encoder, decoder, and parser with component-level control." url="/url-encoder-decoder" />
    </div>
  );
}

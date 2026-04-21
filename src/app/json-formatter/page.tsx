import type { Metadata } from "next";
import JsonFormatter from "@/components/tools/JsonFormatter";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Format, Beautify & Validate JSON Online",
  description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON with syntax highlighting, tree view, and configurable indentation. 100% client-side.",
  keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "format JSON online", "JSON minifier", "JSON tree view"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">JSON Formatter & Validator</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Format, beautify, validate, and minify JSON with syntax highlighting and tree view.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="json-top" /></div>
      <div className="mt-6"><JsonFormatter /></div>
      <div className="mt-8"><AdSlot slot="json-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About JSON Formatter</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Our JSON formatter helps you format, validate, and beautify JSON data instantly. Paste your JSON, choose your indentation style, and get perfectly formatted output with syntax highlighting. The tree view lets you explore nested structures visually.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/how-to-format-json" className="text-primary hover:underline">How to Format JSON — Complete Guide</Link></li>
          <li><Link href="/html-formatter" className="text-primary hover:underline">HTML Formatter & Beautifier</Link></li>
          <li><Link href="/sql-formatter" className="text-primary hover:underline">SQL Formatter</Link></li>
          <li><Link href="/base64-encoder-decoder" className="text-primary hover:underline">Base64 Encode/Decode</Link></li>
        </ul>
      </div>
      <JsonLd name="JSON Formatter & Validator" description="Free online JSON formatter and validator with syntax highlighting and tree view." url="/json-formatter" />
    </div>
  );
}

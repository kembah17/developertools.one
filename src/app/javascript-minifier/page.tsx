import type { Metadata } from "next";
import JsMinifier from "@/components/tools/JsMinifier";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JavaScript Minifier — Minify JS Code Online for Free",
  description: "Free online JavaScript minifier. Minify JS code by removing whitespace and comments. See size reduction percentage. 100% client-side processing.",
  keywords: ["JavaScript minifier", "minify JS", "JS minifier online", "compress JavaScript", "JavaScript compressor"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">JavaScript Minifier</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Minify JavaScript code by removing whitespace and comments. See size reduction instantly.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="js-top" /></div>
      <div className="mt-6"><JsMinifier /></div>
      <div className="mt-8"><AdSlot slot="js-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About JavaScript Minification</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JavaScript minification removes unnecessary characters from source code without changing its functionality. This includes whitespace, comments, and shortening variable names. Minified code loads faster and reduces bandwidth usage.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/html-formatter" className="text-primary hover:underline">HTML Formatter & Beautifier</Link></li>
          <li><Link href="/css-generator" className="text-primary hover:underline">CSS Generator</Link></li>
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter</Link></li>
          <li><Link href="/regex-tester" className="text-primary hover:underline">Regex Tester</Link></li>
        </ul>
      </div>
      <JsonLd name="JavaScript Minifier" description="Free online JavaScript minifier with size reduction percentage display." url="/javascript-minifier" />
    </div>
  );
}

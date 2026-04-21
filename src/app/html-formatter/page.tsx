import type { Metadata } from "next";
import HtmlFormatter from "@/components/tools/HtmlFormatter";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HTML Formatter & Beautifier — Format and Minify HTML Online",
  description: "Free online HTML formatter and beautifier. Format, beautify, and minify HTML code with proper indentation and syntax highlighting. 100% client-side.",
  keywords: ["HTML formatter", "HTML beautifier", "format HTML", "HTML minifier", "beautify HTML online"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">HTML Formatter & Beautifier</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Format, beautify, and minify HTML code with proper indentation.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="html-top" /></div>
      <div className="mt-6"><HtmlFormatter /></div>
      <div className="mt-8"><AdSlot slot="html-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About HTML Formatter</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Our HTML formatter uses Prettier under the hood to format your HTML code with proper indentation and consistent styling. It handles nested elements, attributes, and self-closing tags correctly.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter & Validator</Link></li>
          <li><Link href="/css-generator" className="text-primary hover:underline">CSS Generator</Link></li>
          <li><Link href="/javascript-minifier" className="text-primary hover:underline">JavaScript Minifier</Link></li>
          <li><Link href="/sql-formatter" className="text-primary hover:underline">SQL Formatter</Link></li>
        </ul>
      </div>
      <JsonLd name="HTML Formatter & Beautifier" description="Free online HTML formatter and beautifier with minification support." url="/html-formatter" />
    </div>
  );
}

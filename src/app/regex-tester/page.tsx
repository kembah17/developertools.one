import type { Metadata } from "next";
import RegexTester from "@/components/tools/RegexTester";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions Online with Match Highlighting",
  description: "Free online regex tester with real-time match highlighting, pattern library, flag support, and match group display. Test your regular expressions instantly.",
  keywords: ["regex tester", "regular expression tester", "regex online", "regex match", "regex pattern", "regex validator"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">Regex Tester</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Test regular expressions with real-time match highlighting, groups, and a common patterns library.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="regex-top" /></div>
      <div className="mt-6"><RegexTester /></div>
      <div className="mt-8"><AdSlot slot="regex-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About Regex Tester</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Our regex tester lets you test regular expressions against any text with real-time match highlighting. See all matches, capture groups, and use our built-in pattern library for common use cases like email validation, URL matching, and more.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/regex-cheat-sheet" className="text-primary hover:underline">Regex Cheat Sheet — Complete Reference</Link></li>
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter & Validator</Link></li>
          <li><Link href="/javascript-minifier" className="text-primary hover:underline">JavaScript Minifier</Link></li>
        </ul>
      </div>
      <JsonLd name="Regex Tester" description="Free online regex tester with real-time match highlighting and pattern library." url="/regex-tester" />
    </div>
  );
}

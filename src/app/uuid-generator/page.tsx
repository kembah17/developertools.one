import type { Metadata } from "next";
import UuidGenerator from "@/components/tools/UuidGenerator";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UUID Generator — Generate UUID v4 Online for Free",
  description: "Free online UUID generator. Generate single or bulk UUID v4 values. Validate UUIDs, choose format options. 100% client-side processing.",
  keywords: ["UUID generator", "generate UUID", "UUID v4", "GUID generator", "random UUID", "bulk UUID"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">UUID Generator</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Generate UUID v4 values, validate UUIDs, and bulk generate with format options.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="uuid-top" /></div>
      <div className="mt-6"><UuidGenerator /></div>
      <div className="mt-8"><AdSlot slot="uuid-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About UUIDs</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">A UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across space and time. UUID v4 uses random numbers for generation, making collisions extremely unlikely. UUIDs are commonly used as database primary keys, session tokens, and distributed system identifiers.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools</h3>
        <ul className="space-y-1">
          <li><Link href="/hash-generator" className="text-primary hover:underline">Hash Generator</Link></li>
          <li><Link href="/base64-encoder-decoder" className="text-primary hover:underline">Base64 Encode/Decode</Link></li>
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter</Link></li>
        </ul>
      </div>
      <JsonLd name="UUID Generator" description="Free online UUID v4 generator with bulk generation and validation." url="/uuid-generator" />
    </div>
  );
}

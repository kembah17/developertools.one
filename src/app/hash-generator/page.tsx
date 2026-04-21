import type { Metadata } from "next";
import HashGenerator from "@/components/tools/HashGenerator";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hash Generator — Generate MD5, SHA-1, SHA-256, SHA-512 Hashes Online",
  description: "Free online hash generator. Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files. Compare hashes for verification. 100% client-side.",
  keywords: ["hash generator", "MD5 hash", "SHA-256 hash", "SHA-512 hash", "hash calculator", "checksum generator"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">Hash Generator</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="hash-top" /></div>
      <div className="mt-6"><HashGenerator /></div>
      <div className="mt-8"><AdSlot slot="hash-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About Hash Functions</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Cryptographic hash functions produce a fixed-size output from any input. They are one-way functions — you cannot reverse a hash to get the original input. Hashes are used for data integrity verification, password storage, and digital signatures.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/base64-encoder-decoder" className="text-primary hover:underline">Base64 Encode/Decode</Link></li>
          <li><Link href="/uuid-generator" className="text-primary hover:underline">UUID Generator</Link></li>
          <li><Link href="/jwt-decoder" className="text-primary hover:underline">JWT Decoder</Link></li>
        </ul>
      </div>
      <JsonLd name="Hash Generator" description="Free online hash generator for MD5, SHA-1, SHA-256, and SHA-512 with file support." url="/hash-generator" />
    </div>
  );
}

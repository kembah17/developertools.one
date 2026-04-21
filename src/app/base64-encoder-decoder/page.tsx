import type { Metadata } from "next";
import Base64Tool from "@/components/tools/Base64Tool";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode — Free Online Base64 Encoder/Decoder",
  description: "Free online Base64 encoder and decoder. Encode text to Base64, decode Base64 to text, convert files to Base64 with drag & drop. Supports URL-safe Base64.",
  keywords: ["base64 encode", "base64 decode", "base64 encoder", "base64 decoder", "file to base64", "base64 online"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">Base64 Encode & Decode</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Encode text to Base64, decode Base64 to text, and convert files with drag & drop support.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="base64-top" /></div>
      <div className="mt-6"><Base64Tool /></div>
      <div className="mt-8"><AdSlot slot="base64-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About Base64 Encoding</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used for embedding images in HTML/CSS, transmitting data in URLs, and encoding email attachments.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/base64-encoding-explained" className="text-primary hover:underline">Base64 Encoding Explained — Complete Guide</Link></li>
          <li><Link href="/url-encoder-decoder" className="text-primary hover:underline">URL Encode/Decode</Link></li>
          <li><Link href="/hash-generator" className="text-primary hover:underline">Hash Generator</Link></li>
          <li><Link href="/jwt-decoder" className="text-primary hover:underline">JWT Decoder</Link></li>
        </ul>
      </div>
      <JsonLd name="Base64 Encoder & Decoder" description="Free online Base64 encoder and decoder with file support and URL-safe encoding." url="/base64-encoder-decoder" />
    </div>
  );
}

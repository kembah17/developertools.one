import type { Metadata } from "next";
import JwtDecoder from "@/components/tools/JwtDecoder";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode JSON Web Tokens Online for Free",
  description: "Free online JWT decoder. Decode and inspect JSON Web Tokens. View header, payload, and signature with expiration status. No verification needed.",
  keywords: ["JWT decoder", "decode JWT", "JSON Web Token decoder", "JWT parser", "JWT inspector"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">JWT Decoder</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Decode and inspect JSON Web Tokens. View header, payload, and expiration status.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="jwt-top" /></div>
      <div className="mt-6"><JwtDecoder /></div>
      <div className="mt-8"><AdSlot slot="jwt-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About JWT Tokens</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JSON Web Tokens (JWTs) are a compact, URL-safe means of representing claims between two parties. They consist of three parts: header, payload, and signature. This decoder only reads the token — no secret key is needed or used.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/jwt-tokens-explained" className="text-primary hover:underline">JWT Tokens Explained — Complete Guide</Link></li>
          <li><Link href="/base64-encoder-decoder" className="text-primary hover:underline">Base64 Encode/Decode</Link></li>
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter</Link></li>
          <li><Link href="/hash-generator" className="text-primary hover:underline">Hash Generator</Link></li>
        </ul>
      </div>
      <JsonLd name="JWT Decoder" description="Free online JWT decoder to inspect JSON Web Token header, payload, and signature." url="/jwt-decoder" />
    </div>
  );
}

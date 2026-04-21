import type { Metadata } from "next";
import CssGenerator from "@/components/tools/CssGenerator";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CSS Generator — Gradient, Box Shadow & Flexbox Generator Online",
  description: "Free online CSS generator. Create gradients, box shadows, and flexbox layouts visually with live preview and copy-ready CSS code.",
  keywords: ["CSS generator", "gradient generator", "box shadow generator", "flexbox generator", "CSS gradient", "CSS box shadow"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">CSS Generator</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Generate gradients, box shadows, and flexbox layouts visually with live preview.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="css-top" /></div>
      <div className="mt-6"><CssGenerator /></div>
      <div className="mt-8"><AdSlot slot="css-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About CSS Generator</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Our CSS generator helps you create beautiful gradients, box shadows, and flexbox layouts visually. Adjust parameters with intuitive controls and see changes in real-time. Copy the generated CSS code directly into your project.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools</h3>
        <ul className="space-y-1">
          <li><Link href="/html-formatter" className="text-primary hover:underline">HTML Formatter</Link></li>
          <li><Link href="/javascript-minifier" className="text-primary hover:underline">JavaScript Minifier</Link></li>
        </ul>
      </div>
      <JsonLd name="CSS Generator" description="Free online CSS generator for gradients, box shadows, and flexbox layouts." url="/css-generator" />
    </div>
  );
}

import type { Metadata } from "next";
import CronGenerator from "@/components/tools/CronGenerator";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cron Expression Generator — Build & Validate Cron Schedules Online",
  description: "Free online cron expression generator. Build cron schedules visually with presets, human-readable descriptions, and next execution time preview.",
  keywords: ["cron expression generator", "cron builder", "crontab generator", "cron schedule", "cron syntax"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">Cron Expression Generator</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Build cron schedules visually with presets, descriptions, and next execution times.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="cron-top" /></div>
      <div className="mt-6"><CronGenerator /></div>
      <div className="mt-8"><AdSlot slot="cron-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About Cron Expressions</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Cron expressions are used to schedule recurring tasks in Unix-like systems. A standard cron expression has 5 fields: minute, hour, day of month, month, and day of week. Our generator helps you build and validate these expressions visually.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/cron-expression-guide" className="text-primary hover:underline">Complete Cron Expression Guide</Link></li>
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter</Link></li>
          <li><Link href="/regex-tester" className="text-primary hover:underline">Regex Tester</Link></li>
        </ul>
      </div>
      <JsonLd name="Cron Expression Generator" description="Free online cron expression generator with visual builder and next execution preview." url="/cron-expression-generator" />
    </div>
  );
}

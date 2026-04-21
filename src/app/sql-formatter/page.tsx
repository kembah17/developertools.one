import type { Metadata } from "next";
import SqlFormatterTool from "@/components/tools/SqlFormatterTool";
import JsonLd from "@/components/seo/JsonLd";
import AdSlot from "@/components/ui/AdSlot";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SQL Formatter — Format & Beautify SQL Queries Online",
  description: "Free online SQL formatter. Format SQL queries with proper indentation and keyword capitalization. Supports MySQL, PostgreSQL, SQLite, and SQL Server dialects.",
  keywords: ["SQL formatter", "format SQL", "SQL beautifier", "SQL formatter online", "SQL pretty print"],
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-3">SQL Formatter</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg">Format SQL queries with proper indentation and keyword capitalization. Supports multiple dialects.</p>
      </div>
      <PrivacyBadge />
      <div className="mt-6"><AdSlot slot="sql-top" /></div>
      <div className="mt-6"><SqlFormatterTool /></div>
      <div className="mt-8"><AdSlot slot="sql-bottom" /></div>
      <div className="mt-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">About SQL Formatter</h2>
        <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Our SQL formatter uses the sql-formatter library to properly indent and capitalize your SQL queries. It supports multiple SQL dialects and helps make complex queries readable and maintainable.</p>
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Related Tools & Guides</h3>
        <ul className="space-y-1">
          <li><Link href="/sql-formatting-best-practices" className="text-primary hover:underline">SQL Formatting Best Practices</Link></li>
          <li><Link href="/json-formatter" className="text-primary hover:underline">JSON Formatter</Link></li>
          <li><Link href="/html-formatter" className="text-primary hover:underline">HTML Formatter</Link></li>
        </ul>
      </div>
      <JsonLd name="SQL Formatter" description="Free online SQL formatter with dialect support for MySQL, PostgreSQL, SQLite, and SQL Server." url="/sql-formatter" />
    </div>
  );
}

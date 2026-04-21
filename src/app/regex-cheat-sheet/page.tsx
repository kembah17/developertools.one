import type { Metadata } from "next";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regex Cheat Sheet — Complete Regular Expression Reference with Examples",
  description: "Comprehensive regex cheat sheet with syntax reference, common patterns, examples, and explanations. Master regular expressions for text processing and validation.",
  keywords: ["regex cheat sheet", "regular expression reference", "regex patterns", "regex examples", "regex syntax"],
};

const faqs = [
  { question: "What is a regular expression (regex)?", answer: "A regular expression (regex) is a sequence of characters that defines a search pattern. Regex is used for pattern matching within strings — finding, replacing, or validating text. It is supported in virtually every programming language and many text editors." },
  { question: "What does the g flag mean in regex?", answer: "The g (global) flag tells the regex engine to find all matches in the string, not just the first one. Without the g flag, the regex stops after the first match. Other common flags include i (case-insensitive), m (multiline), s (dotAll), and u (unicode)." },
  { question: "How do I match an email address with regex?", answer: "A common email regex pattern is: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/. However, email validation with regex is notoriously complex — the full RFC 5322 specification is extremely long. For production use, consider using a dedicated email validation library." },
  { question: "What is the difference between * and + in regex?", answer: "The * quantifier matches zero or more occurrences of the preceding element, while + matches one or more occurrences. For example, /a*/ matches empty string, a, aa, aaa, etc., while /a+/ matches a, aa, aaa but NOT an empty string." },
  { question: "How do I escape special characters in regex?", answer: "Special regex characters (. * + ? ^ $ { } [ ] ( ) | \) must be escaped with a backslash (\) to match them literally. For example, to match a period, use \. instead of just . (which matches any character). In JavaScript strings, you need double backslashes: \\\\." },
  { question: "What are capture groups in regex?", answer: "Capture groups are created with parentheses () and allow you to extract specific parts of a match. For example, /(\d{4})-(\d{2})-(\d{2})/ captures year, month, and day separately from a date string. Non-capturing groups (?:...) group without capturing." },
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="prose-custom">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-4">Regex Cheat Sheet: Complete Regular Expression Reference</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg mb-8">A comprehensive reference guide to regular expression syntax, patterns, and examples for developers.</p>

        <AdSlot slot="article-top" />

        <div className="mt-8 space-y-8 text-text dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction to Regular Expressions</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Regular expressions (regex or regexp) are one of the most powerful tools in a developer's toolkit. They provide a concise and flexible way to search, match, and manipulate text based on patterns. Whether you're validating user input, parsing log files, extracting data from strings, or performing complex find-and-replace operations, regex is the go-to solution.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Regex was first formalized by mathematician Stephen Kleene in the 1950s as part of formal language theory. Today, regex is implemented in virtually every programming language (JavaScript, Python, Java, C#, Go, Rust, PHP, Ruby) and is built into tools like grep, sed, awk, and most text editors.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">While regex can seem intimidating at first, understanding the core concepts makes it much more approachable. This cheat sheet covers everything from basic character matching to advanced lookaheads and backreferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Basic Character Matching</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Pattern</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                    <th className="text-left px-4 py-2 text-text-dark">Example</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">.</td><td className="px-4 py-2">Any character except newline</td><td className="px-4 py-2 font-mono">h.t matches hat, hot, hit</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">\d</td><td className="px-4 py-2">Any digit (0-9)</td><td className="px-4 py-2 font-mono">\d+ matches 123, 42</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">\D</td><td className="px-4 py-2">Any non-digit</td><td className="px-4 py-2 font-mono">\D+ matches abc, hello</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">\w</td><td className="px-4 py-2">Word character (a-z, A-Z, 0-9, _)</td><td className="px-4 py-2 font-mono">\w+ matches hello_world</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">\W</td><td className="px-4 py-2">Non-word character</td><td className="px-4 py-2 font-mono">\W matches @, #, spaces</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">\s</td><td className="px-4 py-2">Whitespace (space, tab, newline)</td><td className="px-4 py-2 font-mono">\s+ matches spaces/tabs</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">\S</td><td className="px-4 py-2">Non-whitespace</td><td className="px-4 py-2 font-mono">\S+ matches any_word</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">\b</td><td className="px-4 py-2">Word boundary</td><td className="px-4 py-2 font-mono">\bcat\b matches cat not cats</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Quantifiers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Pattern</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                    <th className="text-left px-4 py-2 text-text-dark">Example</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">*</td><td className="px-4 py-2">Zero or more</td><td className="px-4 py-2 font-mono">ab*c matches ac, abc, abbc</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">+</td><td className="px-4 py-2">One or more</td><td className="px-4 py-2 font-mono">ab+c matches abc, abbc (not ac)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">?</td><td className="px-4 py-2">Zero or one (optional)</td><td className="px-4 py-2 font-mono">colou?r matches color, colour</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">{"{"}n{"}"}  </td><td className="px-4 py-2">Exactly n times</td><td className="px-4 py-2 font-mono">\d{"{"}3{"}"}  matches 123</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">{"{"}n,{"}"}  </td><td className="px-4 py-2">n or more times</td><td className="px-4 py-2 font-mono">\d{"{"}2,{"}"}  matches 12, 123, 1234</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">{"{"}n,m{"}"}  </td><td className="px-4 py-2">Between n and m times</td><td className="px-4 py-2 font-mono">\d{"{"}2,4{"}"}  matches 12, 123, 1234</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Character Classes & Groups</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Pattern</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                    <th className="text-left px-4 py-2 text-text-dark">Example</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">[abc]</td><td className="px-4 py-2">Any of a, b, or c</td><td className="px-4 py-2 font-mono">[aeiou] matches vowels</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">[^abc]</td><td className="px-4 py-2">Not a, b, or c</td><td className="px-4 py-2 font-mono">[^0-9] matches non-digits</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">[a-z]</td><td className="px-4 py-2">Range: a through z</td><td className="px-4 py-2 font-mono">[a-zA-Z] matches any letter</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">(abc)</td><td className="px-4 py-2">Capture group</td><td className="px-4 py-2 font-mono">(\d+)-(\d+) captures both numbers</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">(?:abc)</td><td className="px-4 py-2">Non-capturing group</td><td className="px-4 py-2 font-mono">(?:http|https):// groups without capturing</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">a|b</td><td className="px-4 py-2">Alternation (or)</td><td className="px-4 py-2 font-mono">cat|dog matches cat or dog</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Anchors & Boundaries</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Pattern</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">^</td><td className="px-4 py-2">Start of string (or line with m flag)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">$</td><td className="px-4 py-2">End of string (or line with m flag)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">\b</td><td className="px-4 py-2">Word boundary</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">\B</td><td className="px-4 py-2">Non-word boundary</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Lookaheads & Lookbehinds</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Lookaheads and lookbehinds (collectively called lookarounds) are zero-width assertions that match a position without consuming characters:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Pattern</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                    <th className="text-left px-4 py-2 text-text-dark">Example</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">(?=...)</td><td className="px-4 py-2">Positive lookahead</td><td className="px-4 py-2 font-mono">\d+(?=px) matches 10 in 10px</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">(?!...)</td><td className="px-4 py-2">Negative lookahead</td><td className="px-4 py-2 font-mono">\d+(?!px) matches 10 in 10em</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">{"(?<="}...)</td><td className="px-4 py-2">Positive lookbehind</td><td className="px-4 py-2 font-mono">{"(?<="}\$)\d+ matches 50 in $50</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">{"(?<!"}...)</td><td className="px-4 py-2">Negative lookbehind</td><td className="px-4 py-2 font-mono">{"(?<!"}\$)\d+ matches 50 in €50</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Common Regex Patterns</h2>
            <div className="space-y-3">
              {[
                { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", desc: "Matches most email addresses" },
                { name: "URL", pattern: "https?://[^\\s/$.?#].[^\\s]*", desc: "Matches HTTP/HTTPS URLs" },
                { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", desc: "Matches US phone numbers" },
                { name: "IPv4 Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", desc: "Matches IPv4 addresses" },
                { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}", desc: "Matches ISO date format" },
                { name: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", desc: "Matches hex color codes" },
                { name: "Strong Password", pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}", desc: "Min 8 chars, upper, lower, digit, special" },
                { name: "HTML Tag", pattern: "<[^>]+>", desc: "Matches HTML tags" },
              ].map((p) => (
                <div key={p.name} className="bg-surface-dark rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-primary-light">{p.name}</span>
                    <span className="text-xs text-text-dark-muted">{p.desc}</span>
                  </div>
                  <code className="text-sm text-text-dark font-mono break-all">{p.pattern}</code>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Regex Flags</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Flag</th>
                    <th className="text-left px-4 py-2 text-text-dark">Name</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">g</td><td className="px-4 py-2">Global</td><td className="px-4 py-2">Find all matches, not just the first</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">i</td><td className="px-4 py-2">Case-insensitive</td><td className="px-4 py-2">Match regardless of case</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">m</td><td className="px-4 py-2">Multiline</td><td className="px-4 py-2">^ and $ match line starts/ends</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">s</td><td className="px-4 py-2">DotAll</td><td className="px-4 py-2">. matches newline characters too</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">u</td><td className="px-4 py-2">Unicode</td><td className="px-4 py-2">Enable full Unicode matching</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6">
            <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">Test Your Regex Patterns</h2>
            <p className="text-text-light dark:text-text-dark-muted mb-4">Try our free regex tester with real-time match highlighting, capture group display, and a built-in pattern library.</p>
            <Link href="/regex-tester" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-surface font-medium rounded-lg transition-colors">Open Regex Tester →</Link>
          </div>
        </div>

        <AdSlot slot="article-bottom" />
      </article>
      <FaqSchema faqs={faqs} />
    </div>
  );
}

import type { Metadata } from "next";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Format JSON — Complete Guide to JSON Formatting, Validation & Best Practices",
  description: "Learn how to format, validate, and beautify JSON data. Covers common JSON errors, formatting tools, best practices, and tips for working with JSON in development.",
  keywords: ["format JSON", "JSON formatting", "JSON validator", "beautify JSON", "JSON best practices", "JSON errors"],
};

const faqs = [
  { question: "What is JSON formatting?", answer: "JSON formatting (also called beautifying or pretty-printing) is the process of adding proper indentation, line breaks, and spacing to JSON data to make it human-readable. Raw JSON is often minified into a single line for efficiency, but formatted JSON is much easier to read and debug." },
  { question: "How do I validate JSON?", answer: "You can validate JSON by parsing it with JSON.parse() in JavaScript, using an online JSON validator tool, or using IDE extensions. Valid JSON must have properly matched braces and brackets, quoted string keys, and correct data types. Common errors include trailing commas, single quotes, and unquoted keys." },
  { question: "What are common JSON formatting errors?", answer: "The most common JSON errors are: trailing commas after the last item in arrays or objects, using single quotes instead of double quotes, unquoted property names, comments (JSON does not support comments), undefined or NaN values, and missing commas between items." },
  { question: "What is the difference between JSON.stringify() and JSON.parse()?", answer: "JSON.stringify() converts a JavaScript object into a JSON string, while JSON.parse() converts a JSON string back into a JavaScript object. JSON.stringify() accepts optional parameters for custom formatting: a replacer function and a space parameter for indentation." },
  { question: "Should I use 2 spaces or 4 spaces for JSON indentation?", answer: "Both 2-space and 4-space indentation are common and acceptable. 2 spaces is more compact and preferred in many JavaScript/TypeScript projects, while 4 spaces provides more visual separation and is common in Python and Java ecosystems. The key is consistency within your project." },
  { question: "Can JSON contain comments?", answer: "No, standard JSON (RFC 8259) does not support comments. If you need comments in configuration files, consider using JSONC (JSON with Comments), JSON5, YAML, or TOML instead. Some tools like VS Code support JSONC for configuration files." },
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="prose-custom">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-4">How to Format JSON: Complete Guide to JSON Formatting, Validation & Best Practices</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg mb-8">Everything you need to know about formatting, validating, and working with JSON data in modern development.</p>

        <AdSlot slot="article-top" />

        <div className="mt-8 space-y-8 text-text dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">What is JSON?</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JSON (JavaScript Object Notation) is a lightweight data interchange format that has become the de facto standard for data exchange on the web. Created by Douglas Crockford in the early 2000s, JSON is easy for humans to read and write, and easy for machines to parse and generate. It is based on a subset of JavaScript but is language-independent, with parsers available for virtually every programming language.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JSON supports six data types: strings (in double quotes), numbers, booleans (true/false), null, arrays (ordered lists), and objects (key-value pairs). This simplicity is one of its greatest strengths — unlike XML, JSON has minimal syntax overhead, making it ideal for APIs, configuration files, and data storage.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">Today, JSON is used everywhere: REST APIs, NoSQL databases like MongoDB, configuration files for tools like package.json and tsconfig.json, and even as a data format for machine learning datasets. Understanding how to properly format and validate JSON is an essential skill for every developer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Format JSON?</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Raw JSON data from APIs or databases is often minified — compressed into a single line with no whitespace. While this is efficient for data transfer (reducing payload size by 10-30%), it is nearly impossible to read. JSON formatting adds proper indentation and line breaks, transforming an unreadable blob into a structured, scannable document.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Formatted JSON is essential for:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-light dark:text-text-dark-muted">
              <li><strong>Debugging API responses</strong> — Quickly identify missing fields, incorrect types, or unexpected values</li>
              <li><strong>Code reviews</strong> — Reviewers can easily scan configuration changes in formatted JSON</li>
              <li><strong>Documentation</strong> — Formatted JSON examples in docs are much more readable</li>
              <li><strong>Configuration management</strong> — Formatted config files are easier to maintain and version control</li>
              <li><strong>Data analysis</strong> — Understanding the structure of complex nested JSON objects</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Format JSON in JavaScript</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JavaScript provides built-in JSON formatting through <code className="bg-surface-dark text-primary-light px-2 py-0.5 rounded font-mono text-sm">JSON.stringify()</code>. The third parameter controls indentation:</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`// Format with 2-space indentation
const data = { name: "John", age: 30, hobbies: ["coding", "reading"] };
const formatted = JSON.stringify(data, null, 2);
console.log(formatted);
// Output:
// {
//   "name": "John",
//   "age": 30,
//   "hobbies": [
//     "coding",
//     "reading"
//   ]
// }

// Format with tab indentation
const tabFormatted = JSON.stringify(data, null, "\t");

// Minify (remove all whitespace)
const minified = JSON.stringify(data);`}</code></pre>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">The second parameter of <code className="bg-surface-dark text-primary-light px-2 py-0.5 rounded font-mono text-sm">JSON.stringify()</code> is a replacer function or array that lets you filter or transform values during serialization. This is useful for removing sensitive data or converting types:</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`// Remove sensitive fields
const user = { name: "John", password: "secret", email: "john@example.com" };
const safe = JSON.stringify(user, ["name", "email"], 2);
// Only includes name and email

// Custom replacer function
const formatted = JSON.stringify(data, (key, value) => {
  if (typeof value === "string") return value.toUpperCase();
  return value;
}, 2);`}</code></pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Validate JSON</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JSON validation ensures your data conforms to the JSON specification. The simplest way to validate JSON in JavaScript is with a try-catch block:</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Usage
console.log(isValidJSON('{"name": "John"}')); // true
console.log(isValidJSON("{'name': 'John'}")); // false (single quotes)
console.log(isValidJSON("{name: 'John'}")); // false (unquoted key)`}</code></pre>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">For more advanced validation, consider JSON Schema — a vocabulary that allows you to annotate and validate JSON documents. Libraries like Ajv (Another JSON Schema Validator) provide fast, standards-compliant validation:</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`import Ajv from "ajv";
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer", minimum: 0 },
    email: { type: "string", format: "email" }
  },
  required: ["name", "email"]
};

const validate = ajv.compile(schema);
const valid = validate({ name: "John", age: 30, email: "john@example.com" });
console.log(valid); // true`}</code></pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Common JSON Errors and How to Fix Them</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Here are the most frequent JSON errors developers encounter:</p>
            <div className="space-y-4">
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-secondary mb-2">1. Trailing Commas</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono mb-2"><code>{`// ❌ Invalid - trailing comma
{ "name": "John", "age": 30, }

// ✅ Valid
{ "name": "John", "age": 30 }`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-secondary mb-2">2. Single Quotes</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono mb-2"><code>{`// ❌ Invalid - single quotes
{ 'name': 'John' }

// ✅ Valid - double quotes only
{ "name": "John" }`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-secondary mb-2">3. Unquoted Keys</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono mb-2"><code>{`// ❌ Invalid - unquoted keys
{ name: "John" }

// ✅ Valid
{ "name": "John" }`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-secondary mb-2">4. Comments</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono mb-2"><code>{`// ❌ Invalid - comments not allowed
{
  "name": "John", // user name
  "age": 30 /* years */
}

// ✅ Valid - no comments
{ "name": "John", "age": 30 }`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-secondary mb-2">5. Special Values</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono mb-2"><code>{`// ❌ Invalid - undefined, NaN, Infinity not allowed
{ "value": undefined, "count": NaN, "max": Infinity }

// ✅ Valid - use null instead
{ "value": null, "count": 0, "max": 999999 }`}</code></pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">JSON Formatting Best Practices</h2>
            <ul className="list-disc pl-6 space-y-3 text-text-light dark:text-text-dark-muted">
              <li><strong>Use consistent indentation</strong> — Pick 2 spaces, 4 spaces, or tabs and stick with it across your project. Configure your editor and linter to enforce this.</li>
              <li><strong>Use meaningful key names</strong> — Choose descriptive, camelCase key names like <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">firstName</code> instead of <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">fn</code>.</li>
              <li><strong>Keep nesting shallow</strong> — Deeply nested JSON (5+ levels) is hard to read and work with. Consider flattening your data structure.</li>
              <li><strong>Validate before parsing</strong> — Always validate JSON from external sources before parsing to prevent errors and potential security issues.</li>
              <li><strong>Use JSON Schema for APIs</strong> — Define schemas for your API request/response bodies to ensure data consistency.</li>
              <li><strong>Minify for production</strong> — Use minified JSON for API responses and data transfer to reduce bandwidth usage.</li>
              <li><strong>Format for version control</strong> — Store formatted JSON in Git repositories so diffs are meaningful and reviewable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">JSON Formatting Tools</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">There are many tools available for formatting JSON:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-light dark:text-text-dark-muted">
              <li><strong><Link href="/json-formatter" className="text-primary hover:underline">Our JSON Formatter</Link></strong> — Free online tool with syntax highlighting, tree view, and validation</li>
              <li><strong>VS Code</strong> — Built-in JSON formatting with Shift+Alt+F (or configure format on save)</li>
              <li><strong>jq</strong> — Command-line JSON processor: <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">{"echo '{\"a\":1}' | jq ."}</code></li>
              <li><strong>Prettier</strong> — Code formatter that handles JSON along with JavaScript, TypeScript, CSS, and more</li>
              <li><strong>Python</strong> — <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">python -m json.tool file.json</code></li>
            </ul>
          </section>

          <div className="mt-8 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6">
            <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">Try Our JSON Formatter</h2>
            <p className="text-text-light dark:text-text-dark-muted mb-4">Format, validate, and beautify your JSON data instantly with our free online tool. Features syntax highlighting, tree view, and configurable indentation.</p>
            <Link href="/json-formatter" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-surface font-medium rounded-lg transition-colors">Open JSON Formatter →</Link>
          </div>
        </div>

        <AdSlot slot="article-bottom" />
      </article>
      <FaqSchema faqs={faqs} />
    </div>
  );
}

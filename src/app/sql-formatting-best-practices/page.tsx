import type { Metadata } from "next";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SQL Formatting Best Practices — Style Guide, Naming Conventions & Query Optimization",
  description: "Complete SQL formatting guide. Learn SQL style conventions, naming best practices, query optimization tips, and formatting rules for readable, maintainable SQL code.",
  keywords: ["SQL formatting", "SQL best practices", "SQL style guide", "SQL naming conventions", "SQL optimization"],
};

const faqs = [
  { question: "Why should I format SQL queries?", answer: "Formatted SQL is dramatically easier to read, debug, and maintain. Properly indented queries with consistent capitalization help team members understand complex joins, subqueries, and conditions at a glance. It also makes code reviews more effective and reduces the chance of introducing bugs." },
  { question: "Should SQL keywords be uppercase or lowercase?", answer: "The most common convention is UPPERCASE for SQL keywords (SELECT, FROM, WHERE, JOIN) and lowercase for table/column names. This creates a clear visual distinction between SQL syntax and your data model. However, consistency within your team is more important than which convention you choose." },
  { question: "How should I name database tables and columns?", answer: "Use snake_case for table and column names (user_accounts, created_at). Use plural nouns for table names (users, orders, products). Avoid reserved words, abbreviations, and prefixes like tbl_. Be descriptive: email_address is better than email or e_addr." },
  { question: "What is the best indentation for SQL?", answer: "Use consistent indentation (2 or 4 spaces) for clause continuation. Each major clause (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY) should start on a new line at the base indentation level. Column lists and conditions should be indented one level deeper." },
  { question: "How can I optimize slow SQL queries?", answer: "Start by analyzing the query execution plan (EXPLAIN). Common optimizations include: adding appropriate indexes, avoiding SELECT *, using JOINs instead of subqueries where possible, limiting result sets with WHERE and LIMIT, avoiding functions on indexed columns in WHERE clauses, and using EXISTS instead of IN for subqueries." },
  { question: "Should I use aliases in SQL queries?", answer: "Yes, table aliases make queries more readable, especially with joins. Use meaningful short aliases (u for users, o for orders) rather than arbitrary letters. Always use AS keyword for clarity: FROM users AS u. For column aliases, use descriptive names: SELECT count(*) AS total_orders." },
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="prose-custom">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-4">SQL Formatting Best Practices: Style Guide, Naming Conventions & Optimization</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg mb-8">A comprehensive guide to writing clean, readable, and maintainable SQL code with industry-standard conventions.</p>

        <AdSlot slot="article-top" />

        <div className="mt-8 space-y-8 text-text dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">Why SQL Formatting Matters</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">SQL is one of the most widely used programming languages in the world, powering everything from small applications to massive data warehouses processing petabytes of data. Yet SQL formatting is often overlooked — developers write queries as single-line strings, use inconsistent capitalization, and create deeply nested subqueries that are nearly impossible to debug.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Well-formatted SQL is not just about aesthetics. It directly impacts productivity, code quality, and system reliability. Studies show that developers spend 70% of their time reading code rather than writing it. When SQL queries are properly formatted, team members can quickly understand complex logic, identify potential issues during code reviews, and make modifications with confidence.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">This guide covers the most widely accepted SQL formatting conventions, drawing from industry standards used at companies like Google, Facebook, and Airbnb. Whether you are writing simple SELECT statements or complex analytical queries with multiple CTEs and window functions, these practices will help you write SQL that is a pleasure to read and maintain.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Keyword Capitalization</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">The most universally accepted SQL convention is to write SQL keywords in UPPERCASE and identifiers (table names, column names) in lowercase:</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-bold text-accent mb-2">✅ Good</h4>
                <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto"><code>{`SELECT
  u.first_name,
  u.email,
  COUNT(o.id) AS order_count
FROM users AS u
LEFT JOIN orders AS o
  ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC
LIMIT 10;`}</code></pre>
              </div>
              <div>
                <h4 className="text-sm font-bold text-secondary mb-2">❌ Bad</h4>
                <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto"><code>{`select u.first_name, u.email,
count(o.id) as order_count
from users u left join orders o
on u.id = o.user_id where
u.status = 'active' group by
u.id having count(o.id) > 5
order by order_count desc limit 10;`}</code></pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Indentation & Line Breaks</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Proper indentation is the single most impactful formatting practice. Follow these rules:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-light dark:text-text-dark-muted mb-4">
              <li><strong>Major clauses on new lines</strong> — SELECT, FROM, WHERE, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT each start on a new line at the base indentation level</li>
              <li><strong>Column lists indented</strong> — Each column in SELECT gets its own line, indented 2-4 spaces</li>
              <li><strong>JOIN conditions indented</strong> — ON clauses are indented under their JOIN</li>
              <li><strong>WHERE conditions</strong> — Each AND/OR condition on a new line, with the operator at the start</li>
              <li><strong>Subqueries indented</strong> — Subqueries are indented one level from the enclosing query</li>
            </ul>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`SELECT
  p.product_name,
  p.category,
  p.price,
  SUM(oi.quantity) AS total_sold,
  SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM products AS p
INNER JOIN order_items AS oi
  ON p.id = oi.product_id
INNER JOIN orders AS o
  ON oi.order_id = o.id
WHERE o.status = 'completed'
  AND o.created_at >= '2024-01-01'
  AND p.category IN ('electronics', 'clothing')
GROUP BY
  p.id,
  p.product_name,
  p.category,
  p.price
HAVING SUM(oi.quantity) > 10
ORDER BY total_revenue DESC
LIMIT 50;`}</code></pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Naming Conventions</h2>
            <div className="space-y-4">
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">Tables</h3>
                <ul className="list-disc pl-6 space-y-1 text-text-light dark:text-text-dark-muted text-sm">
                  <li>Use <strong>plural snake_case</strong>: users, order_items, product_categories</li>
                  <li>Avoid prefixes like tbl_ or t_ — they add noise without value</li>
                  <li>Use descriptive names: user_login_history not ulh</li>
                  <li>Junction tables: user_roles, product_tags (both table names, alphabetical)</li>
                </ul>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">Columns</h3>
                <ul className="list-disc pl-6 space-y-1 text-text-light dark:text-text-dark-muted text-sm">
                  <li>Use <strong>singular snake_case</strong>: first_name, created_at, is_active</li>
                  <li>Primary key: id (simple) or user_id (descriptive)</li>
                  <li>Foreign keys: match the referenced table: user_id references users.id</li>
                  <li>Booleans: prefix with is_, has_, can_: is_active, has_subscription</li>
                  <li>Timestamps: suffix with _at: created_at, updated_at, deleted_at</li>
                  <li>Dates: suffix with _date or _on: birth_date, expires_on</li>
                </ul>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">Indexes</h3>
                <ul className="list-disc pl-6 space-y-1 text-text-light dark:text-text-dark-muted text-sm">
                  <li>Pattern: idx_tablename_columnname(s)</li>
                  <li>Unique: uq_tablename_columnname</li>
                  <li>Example: idx_users_email, idx_orders_user_id_created_at</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Common Table Expressions (CTEs)</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">CTEs (WITH clauses) are one of the most powerful tools for writing readable SQL. They let you break complex queries into named, logical steps:</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', o.created_at) AS month,
    SUM(o.total_amount) AS revenue
  FROM orders AS o
  WHERE o.status = 'completed'
  GROUP BY DATE_TRUNC('month', o.created_at)
),
revenue_growth AS (
  SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
    ROUND(
      (revenue - LAG(revenue) OVER (ORDER BY month))
      / LAG(revenue) OVER (ORDER BY month) * 100,
      2
    ) AS growth_pct
  FROM monthly_revenue
)
SELECT
  month,
  revenue,
  prev_revenue,
  growth_pct
FROM revenue_growth
WHERE month >= '2024-01-01'
ORDER BY month;`}</code></pre>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">CTEs make queries self-documenting. Each CTE has a descriptive name that explains what it computes, making the overall query logic clear even to someone seeing it for the first time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Query Optimization Tips</h2>
            <ul className="list-disc pl-6 space-y-3 text-text-light dark:text-text-dark-muted">
              <li><strong>Use EXPLAIN ANALYZE</strong> — Always check the execution plan before optimizing. Focus on the actual bottleneck, not assumptions.</li>
              <li><strong>Avoid SELECT *</strong> — Only select the columns you need. This reduces I/O, memory usage, and network transfer.</li>
              <li><strong>Index strategically</strong> — Create indexes on columns used in WHERE, JOIN, and ORDER BY clauses. But do not over-index — each index slows down writes.</li>
              <li><strong>Use appropriate JOINs</strong> — INNER JOIN when you need matching rows in both tables. LEFT JOIN when you need all rows from the left table. Avoid CROSS JOIN unless intentional.</li>
              <li><strong>Limit result sets</strong> — Always use LIMIT for queries that could return large result sets. Implement pagination for user-facing queries.</li>
              <li><strong>Avoid functions on indexed columns</strong> — <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">WHERE YEAR(created_at) = 2024</code> cannot use an index. Use <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">WHERE created_at &gt;= &apos;2024-01-01&apos;</code> instead.</li>
              <li><strong>Use EXISTS over IN for subqueries</strong> — EXISTS stops at the first match, while IN evaluates the entire subquery.</li>
              <li><strong>Batch large operations</strong> — Instead of updating millions of rows at once, process in batches of 1,000-10,000 to avoid lock contention.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">SQL Anti-Patterns to Avoid</h2>
            <div className="space-y-4">
              {[
                { name: "N+1 Queries", bad: "Running a query for each row in a loop", good: "Use JOINs or batch queries to fetch related data in one query" },
                { name: "Implicit Joins", bad: "FROM users, orders WHERE users.id = orders.user_id", good: "Use explicit JOIN syntax: FROM users JOIN orders ON ..." },
                { name: "SELECT * in Production", bad: "SELECT * FROM users (fetches all columns)", good: "SELECT id, name, email FROM users (only needed columns)" },
                { name: "Missing WHERE on UPDATE/DELETE", bad: "UPDATE users SET status = \"inactive\" (updates ALL rows!)", good: "Always include WHERE clause; use transactions for safety" },
                { name: "String Concatenation for Queries", bad: "\"SELECT * FROM users WHERE id = \" + userId", good: "Use parameterized queries to prevent SQL injection" },
              ].map((p) => (
                <div key={p.name} className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                  <h4 className="font-bold text-primary mb-2">{p.name}</h4>
                  <div className="text-sm space-y-1">
                    <p className="text-secondary">❌ {p.bad}</p>
                    <p className="text-accent">✅ {p.good}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">SQL Formatting Tools</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Automate your SQL formatting with these tools:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-light dark:text-text-dark-muted">
              <li><strong><Link href="/sql-formatter" className="text-primary hover:underline">Our SQL Formatter</Link></strong> — Free online tool supporting MySQL, PostgreSQL, SQLite, and SQL Server dialects</li>
              <li><strong>SQLFluff</strong> — Python-based SQL linter and formatter with configurable rules</li>
              <li><strong>pgFormatter</strong> — PostgreSQL-specific formatter with extensive options</li>
              <li><strong>DBeaver</strong> — Database IDE with built-in SQL formatting</li>
              <li><strong>VS Code Extensions</strong> — SQL Formatter, SQLTools, and other extensions provide format-on-save</li>
            </ul>
          </section>

          <div className="mt-8 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6">
            <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">Format Your SQL Queries</h2>
            <p className="text-text-light dark:text-text-dark-muted mb-4">Use our free SQL formatter to beautify your queries with proper indentation and keyword capitalization. Supports multiple SQL dialects.</p>
            <Link href="/sql-formatter" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-surface font-medium rounded-lg transition-colors">Open SQL Formatter →</Link>
          </div>
        </div>

        <AdSlot slot="article-bottom" />
      </article>
      <FaqSchema faqs={faqs} />
    </div>
  );
}

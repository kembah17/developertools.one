import type { Metadata } from "next";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cron Expression Guide — Complete Cron Syntax Reference with Examples",
  description: "Complete guide to cron expressions and crontab syntax. Learn cron fields, special characters, common schedules, and best practices with practical examples.",
  keywords: ["cron expression", "crontab syntax", "cron schedule", "cron guide", "cron examples", "cron tutorial"],
};

const faqs = [
  { question: "What is a cron expression?", answer: "A cron expression is a string of five (or six) fields separated by spaces that defines a schedule for recurring tasks. The five standard fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Cron is used in Unix/Linux systems, CI/CD pipelines, cloud schedulers, and task automation." },
  { question: "What does * mean in a cron expression?", answer: "The asterisk (*) is a wildcard that means every possible value for that field. For example, * in the minute field means every minute, * in the hour field means every hour. So * * * * * means every minute of every hour of every day." },
  { question: "How do I run a cron job every 5 minutes?", answer: "Use */5 * * * * to run every 5 minutes. The */5 in the minute field means every 5th minute (0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55). Similarly, */10 runs every 10 minutes, */15 every 15 minutes." },
  { question: "What is the difference between 5-field and 6-field cron?", answer: "Standard Unix cron uses 5 fields (minute, hour, day, month, weekday). Some systems like Quartz Scheduler and Spring add a 6th field for seconds at the beginning. AWS CloudWatch and some CI/CD tools may also support seconds. Always check your platform documentation." },
  { question: "Can I run a cron job on specific days of the week?", answer: "Yes, use the 5th field (day of week) with values 0-6 (Sunday=0) or 1-7 (Monday=1 in some systems). Examples: 0 9 * * 1-5 runs at 9 AM on weekdays, 0 18 * * 0 runs at 6 PM on Sundays, 0 8 * * 1,3,5 runs at 8 AM on Monday, Wednesday, Friday." },
  { question: "How do I debug a cron expression?", answer: "Use a cron expression generator tool to visualize next execution times. Check system logs (/var/log/cron or journalctl) for execution history. Common issues include timezone mismatches, PATH not being set in cron environment, and permission problems. Always test with a simple command first." },
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="prose-custom">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-4">Cron Expression Guide: Complete Cron Syntax Reference</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg mb-8">Master cron expressions with this comprehensive guide covering syntax, special characters, common schedules, and best practices.</p>

        <AdSlot slot="article-top" />

        <div className="mt-8 space-y-8 text-text dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">What is Cron?</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Cron is a time-based job scheduler in Unix-like operating systems. Users can schedule commands or scripts to run automatically at specified intervals — from every minute to once a year. The name "cron" comes from the Greek word "chronos" meaning time.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Cron is fundamental to system administration and DevOps. It powers automated backups, log rotation, database maintenance, report generation, email sending, cache clearing, and countless other recurring tasks. Beyond Unix systems, cron syntax has been adopted by cloud platforms (AWS CloudWatch, Google Cloud Scheduler), CI/CD tools (GitHub Actions, GitLab CI), and application frameworks (Spring, Laravel, Node.js).</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">The crontab (cron table) file stores the schedule of cron entries. Each user can have their own crontab, and there is a system-wide crontab as well. Understanding cron expression syntax is essential for any developer or system administrator.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cron Expression Syntax</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">A standard cron expression consists of 5 fields separated by spaces:</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12 or JAN-DEC)
│ │ │ │ ┌───────────── day of week (0-6 or SUN-SAT)
│ │ │ │ │
* * * * *`}</code></pre>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light">Field</th>
                    <th className="text-left px-4 py-2 text-text-dark">Values</th>
                    <th className="text-left px-4 py-2 text-text-dark">Special Characters</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono">Minute</td><td className="px-4 py-2">0-59</td><td className="px-4 py-2 font-mono">* , - /</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono">Hour</td><td className="px-4 py-2">0-23</td><td className="px-4 py-2 font-mono">* , - /</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono">Day of Month</td><td className="px-4 py-2">1-31</td><td className="px-4 py-2 font-mono">* , - / ? L W</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono">Month</td><td className="px-4 py-2">1-12 or JAN-DEC</td><td className="px-4 py-2 font-mono">* , - /</td></tr>
                  <tr><td className="px-4 py-2 font-mono">Day of Week</td><td className="px-4 py-2">0-6 or SUN-SAT</td><td className="px-4 py-2 font-mono">* , - / ? L #</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Special Characters Explained</h2>
            <div className="space-y-3">
              {[
                { char: "*", name: "Asterisk (Wildcard)", desc: "Matches every possible value. * in hour means every hour (0-23)." },
                { char: ",", name: "Comma (List)", desc: "Specifies a list of values. 1,3,5 in day-of-week means Monday, Wednesday, Friday." },
                { char: "-", name: "Hyphen (Range)", desc: "Specifies a range. 9-17 in hour means 9 AM through 5 PM." },
                { char: "/", name: "Slash (Step)", desc: "Specifies increments. */15 in minute means every 15 minutes. 2/3 means starting at 2, every 3rd." },
                { char: "?", name: "Question Mark", desc: "No specific value (used in day-of-month and day-of-week when the other is specified). Not supported in all implementations." },
                { char: "L", name: "Last", desc: "Last day of month or last specific weekday. L in day-of-month means last day. 5L means last Friday." },
                { char: "W", name: "Weekday", desc: "Nearest weekday. 15W means nearest weekday to the 15th of the month." },
                { char: "#", name: "Hash", desc: "Nth occurrence. 5#2 means second Friday of the month." },
              ].map((s) => (
                <div key={s.char} className="bg-surface-dark rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <code className="text-lg text-primary-light font-bold font-mono">{s.char}</code>
                    <span className="text-sm font-medium text-text-dark">{s.name}</span>
                  </div>
                  <p className="text-sm text-text-dark-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Common Cron Schedules</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Expression</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">* * * * *</td><td className="px-4 py-2">Every minute</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">*/5 * * * *</td><td className="px-4 py-2">Every 5 minutes</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">*/15 * * * *</td><td className="px-4 py-2">Every 15 minutes</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 * * * *</td><td className="px-4 py-2">Every hour (at minute 0)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 */2 * * *</td><td className="px-4 py-2">Every 2 hours</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 0 * * *</td><td className="px-4 py-2">Every day at midnight</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 6 * * *</td><td className="px-4 py-2">Every day at 6:00 AM</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 9 * * 1-5</td><td className="px-4 py-2">Weekdays at 9:00 AM</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 0 * * 0</td><td className="px-4 py-2">Every Sunday at midnight</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 0 1 * *</td><td className="px-4 py-2">First day of every month at midnight</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">0 0 1 1 *</td><td className="px-4 py-2">January 1st at midnight (yearly)</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">30 4 1,15 * *</td><td className="px-4 py-2">4:30 AM on 1st and 15th of every month</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cron in Different Platforms</h2>
            <div className="space-y-4">
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">Linux/Unix Crontab</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono overflow-auto"><code>{`# Edit crontab
crontab -e

# List cron jobs
crontab -l

# Example: backup database daily at 2 AM
0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">GitHub Actions</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono overflow-auto"><code>{`on:
  schedule:
    - cron: '0 6 * * 1-5'  # Weekdays at 6 AM UTC`}</code></pre>
              </div>
              <div className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">Node.js (node-cron)</h3>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono overflow-auto"><code>{`import cron from 'node-cron';
cron.schedule('*/5 * * * *', () => {
  console.log('Running every 5 minutes');
});`}</code></pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cron Best Practices</h2>
            <ul className="list-disc pl-6 space-y-3 text-text-light dark:text-text-dark-muted">
              <li><strong>Always specify timezone</strong> — Cron runs in the system timezone by default. Use TZ=UTC or set timezone explicitly to avoid confusion.</li>
              <li><strong>Redirect output</strong> — Always redirect stdout and stderr to log files: <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">{">> /var/log/job.log 2>&1"}</code></li>
              <li><strong>Use lock files</strong> — Prevent overlapping executions with flock: <code className="bg-surface-dark text-primary-light px-1 rounded font-mono text-sm">flock -n /tmp/job.lock command</code></li>
              <li><strong>Set PATH explicitly</strong> — Cron has a minimal PATH. Set it at the top of your crontab or use absolute paths.</li>
              <li><strong>Test with short intervals first</strong> — Before setting a monthly job, test with every-minute to verify it works.</li>
              <li><strong>Monitor cron jobs</strong> — Use monitoring tools to alert when cron jobs fail or do not run.</li>
              <li><strong>Stagger execution times</strong> — Avoid scheduling everything at minute 0 to prevent resource spikes.</li>
            </ul>
          </section>

          <div className="mt-8 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6">
            <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">Build Cron Expressions Visually</h2>
            <p className="text-text-light dark:text-text-dark-muted mb-4">Use our free cron expression generator to build schedules visually with presets, descriptions, and next execution time preview.</p>
            <Link href="/cron-expression-generator" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-surface font-medium rounded-lg transition-colors">Open Cron Generator →</Link>
          </div>
        </div>

        <AdSlot slot="article-bottom" />
      </article>
      <FaqSchema faqs={faqs} />
    </div>
  );
}

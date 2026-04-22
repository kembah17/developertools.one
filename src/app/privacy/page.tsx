import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — DeveloperTools.one",
  description: "DeveloperTools.one privacy policy. All tools run 100% client-side in your browser. No data is collected, stored, or transmitted to any server.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-6">Privacy Policy</h1>
      <p className="text-text-light dark:text-text-dark-muted mb-2">Last updated: April 21, 2025</p>

      <div className="space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
          <p className="text-accent-dark dark:text-accent font-bold mb-1">🔒 Our Core Privacy Promise</p>
          <p>All DeveloperTools.one tools process data 100% client-side in your browser. Your code, text, tokens, files, and any other data you input into our tools <strong>never leaves your device</strong>. We cannot see, access, store, or transmit your data because it is never sent to any server.</p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">1. Data Processing</h2>
          <p>DeveloperTools.one is designed with a privacy-first architecture. All tool functionality is implemented using client-side JavaScript that runs entirely within your web browser. This means:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>No data you input into any tool is transmitted over the network</li>
            <li>No data is stored on our servers (we have no data storage infrastructure)</li>
            <li>No data is shared with third parties for processing</li>
            <li>All computations happen locally on your device</li>
            <li>Tools continue to work even when offline (after initial page load)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">2. Information We Collect</h2>
          <h3 className="text-lg font-semibold text-text dark:text-text-dark mt-4 mb-2">2.1 Analytics Data</h3>
          <p>We may use privacy-respecting analytics services to understand how our site is used. This may include:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Pages visited and general usage patterns</li>
            <li>Approximate geographic location (country/region level)</li>
            <li>Browser type and device category</li>
            <li>Referral source</li>
          </ul>
          <p className="mt-2">This data is aggregated and anonymized. It does not include any content you process with our tools.</p>

          <h3 className="text-lg font-semibold text-text dark:text-text-dark mt-4 mb-2">2.2 Advertising</h3>
          <p>We display advertisements to support the free operation of our tools. Our advertising partners may use cookies to serve relevant ads. You can manage cookie preferences through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">3. Cookies</h2>
          <p>DeveloperTools.one may use the following types of cookies:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Essential cookies</strong> — For basic site functionality such as dark mode preference</li>
            <li><strong>Analytics cookies</strong> — To understand site usage patterns (anonymized)</li>
            <li><strong>Advertising cookies</strong> — Used by our ad partners to serve relevant advertisements</li>
          </ul>
          <p className="mt-2">No cookies are used to track or store the content you process with our tools.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">4. Third-Party Services</h2>
          <p>Our tools do not use any third-party APIs or services for data processing. The only third-party services on our site are:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Analytics services (for anonymized usage statistics)</li>
            <li>Advertising networks (for displaying ads)</li>
            <li>Content delivery networks (for serving static assets)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">5. Data Security</h2>
          <p>Since all data processing occurs in your browser and no user data is transmitted to or stored on our servers, the security of your data is inherently protected by the client-side architecture. We recommend keeping your browser updated to benefit from the latest security patches.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">6. Children&apos;s Privacy</h2>
          <p>DeveloperTools.one does not knowingly collect personal information from children under 13. Our tools are designed for developers and technical professionals.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">7. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of DeveloperTools.one after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">8. Contact</h2>
          <p>If you have questions about this privacy policy, please contact us at <a href="mailto:hello@developertools.one" className="text-primary hover:underline">hello@developertools.one</a>.</p>
        </section>
      </div>
    </div>
  );
}

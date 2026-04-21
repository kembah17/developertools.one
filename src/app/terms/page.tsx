import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — DevTools.run",
  description: "Terms of service for DevTools.run. Free developer tools provided as-is with 100% client-side processing.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-6">Terms of Service</h1>
      <p className="text-text-light dark:text-text-dark-muted mb-2">Last updated: April 21, 2025</p>

      <div className="space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using DevTools.run (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">2. Description of Service</h2>
          <p>DevTools.run provides free, browser-based developer tools including but not limited to JSON formatting, regex testing, Base64 encoding/decoding, URL encoding/decoding, HTML formatting, CSS generation, JavaScript minification, SQL formatting, cron expression generation, JWT decoding, UUID generation, and hash generation. All tools operate entirely within your web browser using client-side JavaScript.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">3. Client-Side Processing</h2>
          <p>All data processing on DevTools.run occurs locally in your web browser. No data you input into our tools is transmitted to, processed by, or stored on our servers. You are solely responsible for the data you process and the results you obtain.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">4. Use of Service</h2>
          <p>You may use DevTools.run for any lawful purpose. You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Attempt to disrupt or interfere with the Service</li>
            <li>Use automated systems to access the Service in a manner that exceeds reasonable use</li>
            <li>Attempt to reverse-engineer, decompile, or extract source code beyond what is publicly available</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">5. Intellectual Property</h2>
          <p>The DevTools.run website, including its design, code, content, and branding, is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without permission. The tools themselves are provided for your free use as described in these terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">6. Disclaimer of Warranties</h2>
          <p>DevTools.run is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from using the tools will be accurate or reliable</li>
            <li>Any errors in the Service will be corrected</li>
          </ul>
          <p className="mt-2">You use the Service at your own risk. Always verify critical results independently.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, DevTools.run and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">8. Advertising</h2>
          <p>DevTools.run is supported by advertising. By using the Service, you acknowledge that advertisements may be displayed alongside our tools. We strive to ensure ads do not interfere with tool functionality.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">9. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Your continued use of the Service after changes constitutes acceptance of the modified terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-3">10. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:hello@devtools.run" className="text-primary hover:underline">hello@devtools.run</a>.</p>
        </section>
      </div>
    </div>
  );
}

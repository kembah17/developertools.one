import type { Metadata } from "next";
import FaqSchema from "@/components/seo/FaqSchema";
import AdSlot from "@/components/ui/AdSlot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JWT Tokens Explained — Structure, Use Cases & Security Best Practices",
  description: "Complete guide to JSON Web Tokens (JWT). Learn JWT structure, how they work, common use cases, security best practices, and implementation examples in JavaScript and Node.js.",
  keywords: ["JWT", "JSON Web Token", "JWT explained", "JWT tutorial", "JWT security", "JWT authentication"],
};

const faqs = [
  { question: "What is a JWT token?", answer: "A JSON Web Token (JWT) is a compact, URL-safe token format used to securely transmit information between parties as a JSON object. JWTs are digitally signed using a secret (HMAC) or public/private key pair (RSA/ECDSA), ensuring the data has not been tampered with. They are commonly used for authentication and authorization in web applications." },
  { question: "What are the three parts of a JWT?", answer: "A JWT consists of three parts separated by dots: the Header (specifies the signing algorithm and token type), the Payload (contains claims — statements about the user and metadata), and the Signature (created by signing the encoded header and payload with a secret key). Each part is Base64URL-encoded." },
  { question: "Are JWT tokens secure?", answer: "JWTs are secure when implemented correctly. The signature prevents tampering, but the payload is only encoded (not encrypted) — anyone can read it. Security best practices include: using HTTPS, setting short expiration times, validating all claims, using strong signing keys, and never storing sensitive data in the payload." },
  { question: "What is the difference between JWT and session-based authentication?", answer: "Session-based auth stores session data on the server and sends a session ID cookie to the client. JWT auth encodes all user data in the token itself (stateless). JWTs scale better (no server-side session storage) but cannot be easily revoked. Sessions are easier to invalidate but require server-side storage and do not scale as easily across multiple servers." },
  { question: "Should I store JWT tokens in localStorage or cookies?", answer: "HttpOnly cookies are generally more secure than localStorage because they are not accessible via JavaScript, protecting against XSS attacks. However, cookies require CSRF protection. localStorage is simpler but vulnerable to XSS. The recommended approach is HttpOnly, Secure, SameSite cookies for web applications." },
  { question: "How do I handle JWT token expiration?", answer: "Use short-lived access tokens (15-30 minutes) paired with longer-lived refresh tokens (days/weeks). When the access token expires, the client uses the refresh token to obtain a new access token without requiring the user to log in again. Store refresh tokens securely and implement token rotation for additional security." },
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="prose-custom">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark mb-4">JWT Tokens Explained: Structure, Use Cases & Security Best Practices</h1>
        <p className="text-text-light dark:text-text-dark-muted text-lg mb-8">Everything you need to know about JSON Web Tokens — from basic structure to production security patterns.</p>

        <AdSlot slot="article-top" />

        <div className="mt-8 space-y-8 text-text dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">What is a JSON Web Token (JWT)?</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JSON Web Token (JWT, pronounced "jot") is an open standard (RFC 7519) that defines a compact and self-contained way to securely transmit information between parties as a JSON object. The information can be verified and trusted because it is digitally signed using a secret (with the HMAC algorithm) or a public/private key pair (using RSA or ECDSA).</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">JWTs have become the de facto standard for authentication in modern web applications, particularly in single-page applications (SPAs), mobile apps, and microservices architectures. They are used by virtually every major platform — Google, Facebook, GitHub, AWS, and countless others use JWTs for their authentication systems.</p>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed">The key advantage of JWTs is that they are stateless — the server does not need to store session data. All the information needed to authenticate a user is contained within the token itself. This makes JWTs ideal for distributed systems where multiple servers need to verify authentication without sharing session state.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">JWT Structure</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">A JWT consists of three parts separated by dots (.):</p>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm font-mono overflow-auto mb-4"><code><span style={{color:"#ef4444"}}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.<span style={{color:"#a855f7"}}>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>.<span style={{color:"#3b82f6"}}>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span></code></pre>
            <div className="space-y-4">
              <div className="border-l-4 rounded-xl p-4 bg-surface dark:bg-surface-dark-alt" style={{borderLeftColor:"#ef4444"}}>
                <h3 className="font-bold mb-2" style={{color:"#ef4444"}}>1. Header</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm mb-2">The header typically consists of two parts: the type of token (JWT) and the signing algorithm (e.g., HMAC SHA256 or RSA).</p>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono"><code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code></pre>
              </div>
              <div className="border-l-4 rounded-xl p-4 bg-surface dark:bg-surface-dark-alt" style={{borderLeftColor:"#a855f7"}}>
                <h3 className="font-bold mb-2" style={{color:"#a855f7"}}>2. Payload</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm mb-2">The payload contains claims — statements about the user and additional metadata. There are three types of claims: registered, public, and private.</p>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono"><code>{`{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022,
  "exp": 1516242622
}`}</code></pre>
              </div>
              <div className="border-l-4 rounded-xl p-4 bg-surface dark:bg-surface-dark-alt" style={{borderLeftColor:"#3b82f6"}}>
                <h3 className="font-bold mb-2" style={{color:"#3b82f6"}}>3. Signature</h3>
                <p className="text-text-light dark:text-text-dark-muted text-sm mb-2">The signature is created by taking the encoded header, encoded payload, a secret, and the algorithm specified in the header, then signing them.</p>
                <pre className="bg-surface-dark rounded-lg p-3 text-sm text-text-dark font-mono"><code>{`HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)`}</code></pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Registered Claims</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">The JWT specification defines several registered claims — predefined claim names that are recommended (but not required):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-primary-light font-mono">Claim</th>
                    <th className="text-left px-4 py-2 text-text-dark">Name</th>
                    <th className="text-left px-4 py-2 text-text-dark">Description</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">iss</td><td className="px-4 py-2">Issuer</td><td className="px-4 py-2">Who issued the token</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">sub</td><td className="px-4 py-2">Subject</td><td className="px-4 py-2">Who the token is about (usually user ID)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">aud</td><td className="px-4 py-2">Audience</td><td className="px-4 py-2">Intended recipient of the token</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">exp</td><td className="px-4 py-2">Expiration</td><td className="px-4 py-2">When the token expires (Unix timestamp)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">nbf</td><td className="px-4 py-2">Not Before</td><td className="px-4 py-2">Token is not valid before this time</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-mono text-primary-light">iat</td><td className="px-4 py-2">Issued At</td><td className="px-4 py-2">When the token was created</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary-light">jti</td><td className="px-4 py-2">JWT ID</td><td className="px-4 py-2">Unique identifier for the token</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How JWT Authentication Works</h2>
            <p className="text-text-light dark:text-text-dark-muted leading-relaxed mb-4">Here is the typical JWT authentication flow:</p>
            <div className="space-y-3">
              {[
                { step: "1", title: "User Login", desc: "User sends credentials (email/password) to the authentication server." },
                { step: "2", title: "Server Validates", desc: "Server verifies credentials against the database. If valid, creates a JWT with user claims." },
                { step: "3", title: "Token Returned", desc: "Server sends the JWT back to the client (in response body or Set-Cookie header)." },
                { step: "4", title: "Client Stores Token", desc: "Client stores the JWT (in HttpOnly cookie or memory — avoid localStorage for sensitive tokens)." },
                { step: "5", title: "Authenticated Requests", desc: "Client includes the JWT in the Authorization header: Bearer <token> for subsequent API requests." },
                { step: "6", title: "Server Verifies", desc: "Server verifies the JWT signature and checks claims (expiration, issuer, etc.) before processing the request." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-surface font-bold text-sm">{s.step}</div>
                  <div>
                    <h4 className="font-bold text-sm">{s.title}</h4>
                    <p className="text-text-light dark:text-text-dark-muted text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">JWT Implementation in Node.js</h2>
            <pre className="bg-surface-dark rounded-xl p-4 text-sm text-text-dark font-mono overflow-auto mb-4"><code>{`import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET; // Use a strong, random secret

// Create a token
function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET,
    {
      expiresIn: "15m",  // Short-lived access token
      issuer: "myapp.com",
      audience: "myapp.com",
    }
  );
}

// Verify a token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET, {
      issuer: "myapp.com",
      audience: "myapp.com",
    });
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Express middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  const { valid, decoded, error } = verifyToken(token);
  if (!valid) {
    return res.status(401).json({ error: "Invalid token", details: error });
  }
  req.user = decoded;
  next();
}`}</code></pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">JWT Use Cases</h2>
            <ul className="list-disc pl-6 space-y-3 text-text-light dark:text-text-dark-muted">
              <li><strong>Authentication</strong> — The most common use case. After login, each subsequent request includes the JWT, allowing access to routes, services, and resources permitted for that user.</li>
              <li><strong>Authorization</strong> — JWTs can contain role and permission claims, enabling fine-grained access control without additional database queries.</li>
              <li><strong>Information Exchange</strong> — JWTs can securely transmit information between parties. The signature ensures the sender is who they claim to be and the content has not been altered.</li>
              <li><strong>Single Sign-On (SSO)</strong> — JWTs are widely used in SSO implementations because of their small overhead and ability to be used across different domains.</li>
              <li><strong>API Authentication</strong> — Stateless JWT authentication is ideal for RESTful APIs, especially in microservices architectures where services need to independently verify requests.</li>
              <li><strong>Password Reset Tokens</strong> — Short-lived JWTs can serve as secure password reset links with built-in expiration.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">JWT Security Best Practices</h2>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-4">
              <p className="text-secondary font-bold mb-2">⚠️ Critical Security Rules</p>
              <ul className="list-disc pl-6 space-y-1 text-text-light dark:text-text-dark-muted text-sm">
                <li>Never store sensitive data (passwords, credit cards) in JWT payload — it is only encoded, not encrypted</li>
                <li>Always validate the signature before trusting any claims</li>
                <li>Always check the exp claim to reject expired tokens</li>
                <li>Use HTTPS for all token transmission</li>
              </ul>
            </div>
            <ul className="list-disc pl-6 space-y-3 text-text-light dark:text-text-dark-muted">
              <li><strong>Use strong signing keys</strong> — For HMAC, use at least 256-bit random secrets. For RSA, use 2048-bit or larger keys. Never use weak or predictable secrets.</li>
              <li><strong>Set short expiration times</strong> — Access tokens should expire in 15-30 minutes. Use refresh tokens for longer sessions.</li>
              <li><strong>Validate all claims</strong> — Check iss (issuer), aud (audience), exp (expiration), and nbf (not before) on every request.</li>
              <li><strong>Use HttpOnly cookies</strong> — Store tokens in HttpOnly, Secure, SameSite cookies to prevent XSS attacks from accessing them.</li>
              <li><strong>Implement token rotation</strong> — Issue new refresh tokens with each use and invalidate the old ones to detect token theft.</li>
              <li><strong>Maintain a token blocklist</strong> — For critical operations (logout, password change), maintain a blocklist of revoked tokens until they expire.</li>
              <li><strong>Avoid the alg:none vulnerability</strong> — Always specify allowed algorithms when verifying tokens. Never accept tokens with alg set to "none".</li>
              <li><strong>Keep payloads small</strong> — JWTs are sent with every request. Large payloads increase bandwidth usage and latency.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">JWT vs. Session-Based Authentication</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-dark">
                    <th className="text-left px-4 py-2 text-text-dark">Aspect</th>
                    <th className="text-left px-4 py-2 text-primary-light">JWT</th>
                    <th className="text-left px-4 py-2 text-accent">Sessions</th>
                  </tr>
                </thead>
                <tbody className="text-text-light dark:text-text-dark-muted">
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-medium">Storage</td><td className="px-4 py-2">Client-side (stateless)</td><td className="px-4 py-2">Server-side (stateful)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-medium">Scalability</td><td className="px-4 py-2">Excellent (no shared state)</td><td className="px-4 py-2">Requires shared session store</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-medium">Revocation</td><td className="px-4 py-2">Difficult (needs blocklist)</td><td className="px-4 py-2">Easy (delete session)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-medium">Size</td><td className="px-4 py-2">Larger (contains claims)</td><td className="px-4 py-2">Small (just session ID)</td></tr>
                  <tr className="border-b border-border dark:border-border-dark"><td className="px-4 py-2 font-medium">Cross-domain</td><td className="px-4 py-2">Easy (Authorization header)</td><td className="px-4 py-2">Difficult (cookie restrictions)</td></tr>
                  <tr><td className="px-4 py-2 font-medium">Mobile-friendly</td><td className="px-4 py-2">Yes (header-based)</td><td className="px-4 py-2">Limited (cookie handling)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6">
            <h2 className="text-xl font-bold text-text dark:text-text-dark mb-3">Decode Your JWT Tokens</h2>
            <p className="text-text-light dark:text-text-dark-muted mb-4">Use our free JWT decoder to inspect token headers, payloads, and check expiration status. No secret key needed — 100% client-side.</p>
            <Link href="/jwt-decoder" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-surface font-medium rounded-lg transition-colors">Open JWT Decoder →</Link>
          </div>
        </div>

        <AdSlot slot="article-bottom" />
      </article>
      <FaqSchema faqs={faqs} />
    </div>
  );
}

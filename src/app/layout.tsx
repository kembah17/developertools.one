import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "DevTools.run — Free Online Developer Tools",
    template: "%s | DevTools.run",
  },
  description: "Free online developer tools: JSON formatter, regex tester, Base64 encoder, SQL formatter, JWT decoder, and more. 100% client-side processing.",
  keywords: ["developer tools", "JSON formatter", "regex tester", "base64 encoder", "SQL formatter", "JWT decoder", "online dev tools"],
  metadataBase: new URL("https://devtools.run"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevTools.run",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){d.classList.add("dark")}else{d.classList.remove("dark")}}catch(e){}})()`
          }}
        />
      </head>
      <body className="bg-page-bg dark:bg-page-bg-dark text-text dark:text-text-dark min-h-screen flex flex-col transition-colors">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default function JsonLd({ name, description, url, category = "DeveloperApplication" }: { name: string; description: string; url: string; category?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `https://developertools.one${url}`,
    applicationCategory: category,
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

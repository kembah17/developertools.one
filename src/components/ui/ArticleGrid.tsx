'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Article {
  title: string;
  desc: string;
  href: string;
}

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
      {articles.map((a) => (
        <Link
          key={a.href}
          href={a.href}
          style={{
            display: 'block',
            backgroundColor: 'var(--color-bg-card)',
            border: hoveredSlug === a.href ? '2px solid var(--color-brand)' : '2px solid var(--color-border)',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            textDecoration: 'none',
            boxShadow: hoveredSlug === a.href ? 'var(--shadow-lg)' : 'var(--shadow-card)',
            transform: hoveredSlug === a.href ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={() => setHoveredSlug(a.href)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <h3 style={{
            fontWeight: 600,
            color: hoveredSlug === a.href ? 'var(--color-brand)' : 'var(--color-text-primary)',
            marginBottom: '0.5rem',
            fontSize: '1rem',
            transition: 'color 0.2s ease',
          }}>
            {a.title}
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {a.desc}
          </p>
          <span style={{
            display: 'inline-block',
            marginTop: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--color-brand)',
          }}>
            Read more →
          </span>
        </Link>
      ))}
    </div>
  );
}

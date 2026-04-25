'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Tool {
  name: string;
  desc: string;
  href: string;
  icon: string;
}

export default function HomeToolGrid({ tools }: { tools: Tool[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          style={{
            display: 'block',
            backgroundColor: 'var(--color-bg-card)',
            border: hoveredSlug === tool.href ? '2px solid var(--color-brand)' : '2px solid var(--color-border)',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            textDecoration: 'none',
            boxShadow: hoveredSlug === tool.href ? 'var(--shadow-lg)' : 'var(--shadow-card)',
            transform: hoveredSlug === tool.href ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={() => setHoveredSlug(tool.href)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '0.75rem',
              backgroundColor: hoveredSlug === tool.href ? 'var(--color-brand)' : 'var(--color-bg-muted)',
              transition: 'background-color 0.2s ease',
            }}
          >
            {tool.icon}
          </div>
          <h3 style={{
            fontWeight: 600,
            color: hoveredSlug === tool.href ? 'var(--color-brand)' : 'var(--color-text-primary)',
            marginBottom: '0.375rem',
            fontSize: '1rem',
            transition: 'color 0.2s ease',
          }}>
            {tool.name}
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {tool.desc}
          </p>
        </Link>
      ))}
    </div>
  );
}

import * as React from 'react';

/**
 * Surface — the dark canon canvas every preview renders on.
 *
 * The Liminal DS is a dark-substrate system (--bg #0A0A0B); components use
 * ink/border tokens tuned for that ground. Rendered on a default-white card
 * they read washed-out or inverted. This wrapper reproduces the real body
 * context every consuming surface declares: it paints --bg and sets the
 * 5-axis attributes (data-product / data-relationship) that scope density
 * and relationship tokens — exactly as a real cut's <body> does.
 *
 * Not a DS component — a preview harness. Authored, not generated.
 */
export function Surface({
  children,
  product = 'personal',
}: {
  children: React.ReactNode;
  product?: 'personal' | 'team' | 'business';
}) {
  return (
    <div
      data-product={product}
      data-relationship="self"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--sans)',
        padding: '28px 32px',
        borderRadius: 10,
      }}
    >
      {children}
    </div>
  );
}

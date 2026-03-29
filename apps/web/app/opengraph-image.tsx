import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site-config';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const alt = `${siteConfig.name} social card`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        background:
          'radial-gradient(circle at top left, rgba(245,158,11,0.22), transparent 34%), radial-gradient(circle at bottom right, rgba(56,189,248,0.14), transparent 38%), #09090B',
        color: '#FAFAFA',
        padding: '56px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          borderRadius: 36,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(17,17,19,0.86)',
          padding: '48px',
          boxShadow: '0 24px 72px rgba(0,0,0,0.32)',
          gap: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div
              style={{
                display: 'flex',
                width: 'auto',
                alignItems: 'center',
                gap: '12px',
                borderRadius: 999,
                border: '1px solid rgba(245,158,11,0.18)',
                background: 'rgba(245,158,11,0.08)',
                padding: '10px 18px',
                color: '#F59E0B',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {siteConfig.shortName}
              <span style={{ color: '#A1A1AA', letterSpacing: '0.16em' }}>
                Built by @kitsunekode
              </span>
            </div>
            <div
              style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 700, letterSpacing: '-0.06em' }}
            >
              {siteConfig.name}
            </div>
            <div style={{ maxWidth: 700, fontSize: 32, lineHeight: 1.35, color: '#D4D4D8' }}>
              Practice JavaScript interview questions with runnable snippets, event-loop visuals,
              and a tighter answer-to-feedback loop.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: 24, color: '#A1A1AA' }}>
            <span>Based on Lydia Hallie&apos;s javascript-questions</span>
            <span style={{ color: '#F59E0B' }}>•</span>
            <span>{siteConfig.creator.displayHandle}</span>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            minWidth: 270,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              height: 240,
              width: 240,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 64,
              border: '2px solid rgba(245,158,11,0.22)',
              background:
                'linear-gradient(160deg, rgba(245,158,11,0.24), rgba(56,189,248,0.14) 120%)',
              boxShadow: '0 0 64px rgba(245,158,11,0.18)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 46,
                top: 44,
                height: 16,
                width: 16,
                borderRadius: 999,
                background: 'rgba(245,158,11,0.82)',
                boxShadow: '0 0 24px rgba(245,158,11,0.5)',
              }}
            />
            <div
              style={{
                color: '#F59E0B',
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: '-0.18em',
                lineHeight: 1,
              }}
            >
              JS
            </div>
            <div
              style={{
                marginTop: 16,
                height: 4,
                width: 74,
                borderRadius: 999,
                background: 'rgba(245,158,11,0.58)',
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}

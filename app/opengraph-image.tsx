import { ImageResponse } from 'next/og';

export const alt = 'Bazalel — strategy-led Squarespace web design';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '70px 76px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          color: '#0a0a0a',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 34, fontWeight: 900, letterSpacing: '-0.05em' }}>
            BAZALEL
          </span>
          <span
            style={{
              display: 'flex',
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#7c3aed',
            }}
          />
        </div>
        <div style={{ display: 'flex', maxWidth: 960, flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 79,
              fontWeight: 900,
              letterSpacing: '-0.055em',
              lineHeight: 0.96,
            }}
          >
            Squarespace websites built for what happens next.
          </span>
          <span style={{ marginTop: 34, color: '#7c3aed', fontSize: 24, fontWeight: 700 }}>
            Strategy-led · Conversion-focused · Built to last
          </span>
        </div>
      </div>
    ),
    size,
  );
}

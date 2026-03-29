import { ImageResponse } from 'next/og';

export const size = {
  width: 128,
  height: 128,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at 25% 25%, rgba(245,158,11,0.32), transparent 42%), #09090B',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          height: 92,
          width: 92,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 28,
          border: '2px solid rgba(245,158,11,0.28)',
          background: 'linear-gradient(160deg, rgba(245,158,11,0.24), rgba(56,189,248,0.12) 120%)',
          boxShadow: '0 0 36px rgba(245,158,11,0.18)',
          color: '#F59E0B',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: 18,
            height: 6,
            width: 6,
            borderRadius: 999,
            background: 'rgba(245,158,11,0.82)',
            boxShadow: '0 0 16px rgba(245,158,11,0.5)',
          }}
        />
        <div
          style={{
            color: '#F59E0B',
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.18em',
            lineHeight: 1,
          }}
        >
          JS
        </div>
        <div
          style={{
            marginTop: 8,
            height: 2,
            width: 24,
            borderRadius: 999,
            background: 'rgba(245,158,11,0.58)',
          }}
        />
      </div>
    </div>,
    size,
  );
}

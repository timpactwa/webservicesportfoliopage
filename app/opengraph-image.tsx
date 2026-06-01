import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Render | Web Design & AI Consulting, Morris County, NJ'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0F0F0F',
          backgroundImage:
            'radial-gradient(ellipse at 78% 30%, rgba(37,99,235,0.22) 0%, transparent 60%)',
          padding: '80px',
        }}
      >
        {/* Bracket sigil */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#3B82F6', fontSize: 96, fontWeight: 800, letterSpacing: '-0.04em' }}>
          {'</>'}
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            We Build the Web
          </div>
          <div style={{ fontSize: 88, fontWeight: 800, color: '#3B82F6', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            for Local Business.
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 44, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Render
          </div>
          <div style={{ fontSize: 30, color: '#A3A3A3' }}>
            Web Design & AI Consulting · Morris County, NJ
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

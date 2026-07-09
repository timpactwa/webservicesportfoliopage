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
          background: '#2d2a25',
          backgroundImage:
            'radial-gradient(ellipse at 78% 30%, rgba(20,160,145,0.22) 0%, transparent 60%)',
          padding: '80px',
        }}
      >
        {/* Compass mark */}
        <svg width="96" height="96" viewBox="0 0 32 32">
          <polygon points="16,2 30,16 16,16" fill="#0a7366" />
          <polygon points="30,16 16,30 16,16" fill="#14a091" />
          <polygon points="16,30 2,16 16,16" fill="#f3efe8" />
          <polygon points="2,16 16,2 16,16" fill="#a8a29a" />
        </svg>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            We Build the Web
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, color: '#5fd0c1', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            for Local Business.
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 44, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            render
          </div>
          <div style={{ fontSize: 30, color: '#c4beb4' }}>
            Web Design & AI Consulting · Morris County, NJ
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

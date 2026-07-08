import ResponsiveDemoPreview from '../../components/ui/ResponsiveDemoPreview'

export function LiveDemoTile() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden', background: '#111' }}>
      <ResponsiveDemoPreview
        url="https://fuego-street-tacos.vercel.app"
        baseHeight={900}
        fallbackScale={0.45}
      />
    </div>
  )
}

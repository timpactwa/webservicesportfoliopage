import DemoModal from '../../components/ui/DemoModal'

export function Open() {
  return (
    <DemoModal
      url="https://fuego-street-tacos.vercel.app"
      title="Fuego Street Tacos demo"
      isOpen
      onClose={() => {}}
    />
  )
}

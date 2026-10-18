export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center">
      <img
        src="/images/logo.png"
        alt="Моя особлива планета"
        className={`h-12 w-auto object-contain md:h-16 ${inverted ? 'brightness-0 invert' : ''}`}
      />
    </span>
  )
}

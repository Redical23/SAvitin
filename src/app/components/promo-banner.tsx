interface PromoBannerProps {
  title: string
  discount: string
  icon: string
  bgColor: string
}

export function PromoBanner({ title, discount, icon, bgColor }: PromoBannerProps) {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer group overflow-hidden relative`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity"></div>
      <div className="relative z-10">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-2xl font-bold">{discount}</p>
        <p className="text-sm opacity-90 mt-2">Shop Now →</p>
      </div>
    </div>
  )
}

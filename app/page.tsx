import ConfiguradorMagico from '@/components/configurador/ConfiguradorMagico'

export default function HomePage() {
  return (
    <main className="min-h-screen gradient-hero">
      {/* ── Navbar ── */}
      <nav className="glass sticky top-0 z-50 border-b border-brand-pink-light/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎀</span>
            <span className="font-heading text-2xl text-text-main font-semibold">
              Impresitos
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#productos" className="font-body text-sm text-text-muted hover:text-text-main transition-colors">
              Productos
            </a>
            <a href="#como-funciona" className="font-body text-sm text-text-muted hover:text-text-main transition-colors">
              Cómo funciona
            </a>
            <button className="
              bg-action-primary hover:bg-action-hover text-white
              font-body text-sm font-medium
              px-5 py-2 rounded-full
              shadow-soft-pink transition-all duration-300
              hover:-translate-y-0.5
            ">
              Ver catálogo
            </button>
          </nav>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/70 rounded-full px-4 py-2 mb-6 shadow-soft">
          <span className="text-sm">✨</span>
          <span className="font-body text-xs font-medium text-text-main">
            Detalles únicos en impresión 3D
          </span>
        </div>
        <h1 className="font-heading text-5xl md:text-6xl text-text-main mb-6 max-w-3xl mx-auto">
          Detalles únicos para tus{' '}
          <span className="text-gradient">momentos especiales</span>
        </h1>
        <p className="font-body text-lg text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Marcadores, llaveros y postales personalizados en impresión 3D.
          Bonitos, asequibles y hechos con el mismo cariño con el que tú preparas tu celebración.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="
            bg-action-primary hover:bg-action-hover text-white
            font-body font-semibold text-base
            px-8 py-4 rounded-full
            shadow-soft-pink transition-all duration-300
            hover:-translate-y-1 hover:shadow-lg
          ">
            Ver todos los detalles 🎁
          </button>
          <button className="
            bg-white/80 hover:bg-white text-text-main
            font-body font-semibold text-base
            px-8 py-4 rounded-full
            shadow-soft transition-all duration-300
            hover:-translate-y-0.5
          ">
            Cómo funciona →
          </button>
        </div>
      </section>

      {/* ── Configurador Demo ── */}
      <section id="configurador" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl text-text-main mb-3">
            ¡Prueba el configurador!
          </h2>
          <p className="font-body text-text-muted">
            Personaliza tu detalle en 3 sencillos pasos
          </p>
        </div>
        <div className="bg-white/80 glass rounded-4xl shadow-soft-lg p-8 md:p-12 max-w-lg mx-auto">
          {/*
            Pasa el variantId real de Shopify cuando tengas la tienda configurada.
            Por ahora usa un ID de demo que no generará un error de compilación.
          */}
          <ConfiguradorMagico
            variantId="gid://shopify/ProductVariant/DEMO_VARIANT_ID"
            productName="marcador personalizado"
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-brand-pink-light/40 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-body text-sm text-text-muted">
            © 2025 Impresitos · Detalles personalizados para tus momentos especiales 🎀
          </p>
        </div>
      </footer>
    </main>
  )
}

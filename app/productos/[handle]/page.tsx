import ProductPageClient from '@/components/producto/ProductPageClient'

// Datos de demo — reemplazar con fetch a Shopify getProductByHandle()
const DEMO_PRODUCT = {
  name: 'Marcador Personalizado',
  price: '4,95 €',
  description:
    'Un marcapáginas único, impreso en 3D con tu nombre o mensaje especial. Perfecto como detalle de boda, bautizo, comunión o cumpleaños. Cada pieza es única y está hecha con mucho cariño.',
  variantId: 'gid://shopify/ProductVariant/DEMO_VARIANT_ID',
  images: [
    'https://placehold.co/600x600/FDE4E4/5C5251?text=Marcador+Rosa&font=fredoka',
    'https://placehold.co/600x600/E2F6EF/5C5251?text=Marcador+Menta&font=fredoka',
    'https://placehold.co/600x600/E5F3FA/5C5251?text=Marcador+Azul&font=fredoka',
  ],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  return {
    title: `${DEMO_PRODUCT.name} — Impresitos`,
    description: DEMO_PRODUCT.description,
    openGraph: {
      title: `${DEMO_PRODUCT.name} — Impresitos`,
      description: DEMO_PRODUCT.description,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  // En producción: const product = await getShopifyProduct(handle)
  const { handle } = await params

  return (
    <main className="min-h-screen gradient-hero">
      {/* ── Navbar ── */}
      <nav className="glass sticky top-0 z-50 border-b border-brand-pink-light/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎀</span>
            <span className="font-heading text-2xl text-text-main font-semibold">Impresitos</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/productos" className="font-body text-sm text-text-muted hover:text-text-main transition-colors">
              Productos
            </a>
            <button className="
              bg-action-primary hover:bg-action-hover text-white
              font-body text-sm font-medium
              px-5 py-2 rounded-full shadow-soft-pink
              transition-all duration-300 hover:-translate-y-0.5
            ">
              🛒 Carrito
            </button>
          </div>
        </div>
      </nav>

      {/* ── Página de producto ── */}
      <ProductPageClient {...DEMO_PRODUCT} />

      {/* ── Footer ── */}
      <footer className="border-t border-brand-pink-light/40 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-body text-sm text-text-muted">
            © 2025 Impresitos · Detalles personalizados para tus momentos especiales 🎀
          </p>
        </div>
      </footer>
    </main>
  )
}

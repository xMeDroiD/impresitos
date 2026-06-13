'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBagIcon, HeartIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface ColorSwatch {
  id: string
  label: string
  hex: string
}

interface ProductGalleryProps {
  images: string[]
  productName: string
}

interface ColorSelectorProps {
  colors: ColorSwatch[]
  selected: string
  onChange: (id: string) => void
}

// ─── Datos de ejemplo (reemplazar con datos reales de Shopify) ────────────────

const DEMO_COLORS: ColorSwatch[] = [
  { id: 'pink',   label: 'Rosa Dulce',   hex: '#FBAEAE' },
  { id: 'mint',   label: 'Verde Menta',  hex: '#B1E5D5' },
  { id: 'blue',   label: 'Azul Cielo',   hex: '#B0DDF0' },
  { id: 'yellow', label: 'Amarillo Sol', hex: '#FDE29F' },
  { id: 'lilac',  label: 'Lila Suave',   hex: '#D4BBDD' },
  { id: 'peach',  label: 'Melocotón',    hex: '#FFCBA4' },
]

// ─── Galería de imágenes ──────────────────────────────────────────────────────
// CLASES CLAVE DE TAILWIND para la galería:
//   Imagen principal:  rounded-2xl overflow-hidden object-cover w-full aspect-square
//   Thumbnails:        rounded-xl overflow-hidden cursor-pointer ring-2 ring-offset-2
//   Thumbnail activo:  ring-brand-pink (resalte del anillo en el seleccionado)
//   Thumbnail inactivo: ring-transparent hover:ring-brand-pink/40

function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="flex flex-col gap-4">
      {/* ── Imagen principal ── */}
      {/* CLASES: rounded-2xl overflow-hidden → encaja con la estética soft */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-pink-light via-brand-blue-light to-brand-mint-light aspect-square shadow-soft-lg group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${productName} — imagen ${activeIdx + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Controles de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm
                flex items-center justify-center shadow-soft
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                hover:bg-white
              "
            >
              <ChevronLeftIcon className="w-4 h-4 text-text-main" />
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm
                flex items-center justify-center shadow-soft
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                hover:bg-white
              "
            >
              <ChevronRightIcon className="w-4 h-4 text-text-main" />
            </button>
          </>
        )}

        {/* Indicador de posición */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`
                  rounded-full transition-all duration-300
                  ${i === activeIdx
                    ? 'w-5 h-1.5 bg-brand-pink'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {/* CLASES CLAVE:
            Base:    rounded-xl overflow-hidden cursor-pointer ring-2 ring-offset-2 transition-all duration-200
            Activo:  ring-brand-pink scale-105 shadow-soft-pink
            Inactivo: ring-transparent hover:ring-brand-pink/40 hover:scale-102 opacity-70 hover:opacity-100
      */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-pressed={i === activeIdx}
              className={`
                flex-shrink-0 w-20 h-20
                rounded-xl overflow-hidden
                ring-2 ring-offset-2 transition-all duration-200
                ${i === activeIdx
                  ? 'ring-brand-pink shadow-soft-pink scale-105 opacity-100'
                  : 'ring-transparent opacity-60 hover:opacity-100 hover:ring-brand-pink/40'
                }
              `}
            >
              <img
                src={src}
                alt={`Miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Selector de color (swatches) ─────────────────────────────────────────────
// CLASES CLAVE DE TAILWIND para los swatches:
//   Base:    w-9 h-9 rounded-full ring-2 ring-offset-2 transition-all duration-200 cursor-pointer
//   Activo:  ring-[hex] scale-110 shadow-md       ← anillo del color del propio swatch
//   Inactivo: ring-transparent hover:ring-[hex]/50 hover:scale-105
//
// El truco del "anillo exterior": ring-offset-2 crea un gap blanco entre el círculo
// de color y el anillo, lo que da ese efecto de "enmarcado" limpio y elegante.

function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-body text-sm font-medium text-text-main">
          Color elegido:
        </span>
        <span className="font-body text-sm text-text-muted">
          {colors.find((c) => c.id === selected)?.label ?? ''}
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {colors.map((color) => (
          <motion.button
            key={color.id}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(color.id)}
            aria-label={`Seleccionar color ${color.label}`}
            aria-pressed={selected === color.id}
            title={color.label}
            className={`
              w-9 h-9 rounded-full
              ring-2 ring-offset-2
              transition-all duration-200
              focus:outline-none focus-visible:ring-text-main
              ${selected === color.id
                ? 'ring-[var(--swatch-color)] scale-110 shadow-md'
                : 'ring-transparent hover:ring-[var(--swatch-color)]/60'
              }
            `}
            style={{
              backgroundColor: color.hex,
              // Pasamos el color como CSS custom property para usarlo en el ring dinámico
              ['--swatch-color' as string]: color.hex,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Componente principal: Página de Producto ─────────────────────────────────

interface ProductPageClientProps {
  images: string[]
  name: string
  price: string
  description: string
  variantId: string
}

export default function ProductPageClient({
  images,
  name,
  price,
  description,
  variantId,
}: ProductPageClientProps) {
  const [selectedColor, setSelectedColor] = useState('pink')
  const [quantity, setQuantity] = useState(1)
  const [wished, setWished] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = async () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* ── Columna izquierda: Galería ── */}
      <ProductGallery images={images} productName={name} />

      {/* ── Columna derecha: Info del producto ── */}
      <div className="flex flex-col gap-7">

        {/* Breadcrumb */}
        <nav aria-label="Ruta de navegación">
          <ol className="flex items-center gap-1.5 font-body text-xs text-text-muted">
            <li><a href="/" className="hover:text-text-main transition-colors">Inicio</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/productos" className="hover:text-text-main transition-colors">Productos</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-text-main font-medium" aria-current="page">{name}</li>
          </ol>
        </nav>

        {/* Título y precio */}
        <div>
          <h1 className="font-heading text-4xl text-text-main mb-2 leading-tight">{name}</h1>
          <div className="flex items-center gap-3 mb-3">
            {/* Estrellas de valoración */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-4 h-4 ${i < 4 ? 'text-brand-yellow' : 'text-brand-yellow/30'}`} />
              ))}
            </div>
            <span className="font-body text-xs text-text-muted">(24 valoraciones)</span>
          </div>
          <p className="font-heading text-3xl text-text-main">{price}</p>
        </div>

        {/* Descripción */}
        <p className="font-body text-base text-text-muted leading-relaxed">{description}</p>

        {/* Separador soft */}
        <div className="h-px bg-brand-pink-light/60 rounded-full" />

        {/* Selector de color */}
        <ColorSelector
          colors={DEMO_COLORS}
          selected={selectedColor}
          onChange={setSelectedColor}
        />

        {/* Separador soft */}
        <div className="h-px bg-brand-pink-light/60 rounded-full" />

        {/* Selector de cantidad */}
        <div className="flex items-center gap-4">
          <span className="font-body text-sm font-medium text-text-main">Cantidad:</span>
          <div className="flex items-center gap-0 bg-white rounded-full shadow-soft border border-brand-pink-light/40">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Reducir cantidad"
              className="w-9 h-9 flex items-center justify-center rounded-full font-body text-lg text-text-muted hover:text-text-main transition-colors"
            >
              −
            </button>
            <span className="font-body text-sm font-semibold text-text-main w-7 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Aumentar cantidad"
              className="w-9 h-9 flex items-center justify-center rounded-full font-body text-lg text-text-muted hover:text-text-main transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          {/* Botón principal */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`
              flex-1 flex items-center justify-center gap-2
              font-body font-semibold text-base
              py-4 rounded-full
              transition-all duration-300
              ${addedToCart
                ? 'bg-brand-mint text-text-main shadow-soft'
                : 'bg-action-primary hover:bg-action-hover text-white shadow-soft-pink hover:-translate-y-0.5 hover:shadow-lg'
              }
            `}
            aria-label="Personalizar y añadir al carrito"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            {addedToCart ? '¡Añadido al carrito! 🎉' : 'Personalizar y añadir 🎀'}
          </motion.button>

          {/* Botón wishlist */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setWished((w) => !w)}
            aria-label={wished ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            className="
              w-14 h-14 flex items-center justify-center
              bg-white rounded-full shadow-soft
              border border-brand-pink-light/40
              hover:shadow-soft-pink hover:-translate-y-0.5
              transition-all duration-300
            "
          >
            {wished
              ? <HeartIcon className="w-5 h-5 text-brand-pink" />
              : <HeartOutline className="w-5 h-5 text-text-muted" />
            }
          </motion.button>
        </div>

        {/* Badges de confianza */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '🎨', label: '100% personalizado' },
            { icon: '📦', label: 'Envío en 3-5 días' },
            { icon: '💚', label: 'Hecho con cariño' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="
                flex flex-col items-center gap-1.5 text-center
                bg-white/70 rounded-2xl p-3 shadow-soft
              "
            >
              <span className="text-xl">{icon}</span>
              <span className="font-body text-xs text-text-muted leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

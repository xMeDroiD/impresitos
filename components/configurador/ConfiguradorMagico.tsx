'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/solid'
import { addToCart } from '@/lib/shopify/cart'

// ─── Tipos ──────────────────────────────────────────────────────────────────

interface ColorOption {
  id: string
  label: string
  hex: string
  tailwind: string
  attributeValue: string
}

interface ConfiguradorMagicoProps {
  /** ID del ProductVariant de Shopify (ej: gid://shopify/ProductVariant/123) */
  variantId: string
  productName?: string
}

// ─── Constantes ──────────────────────────────────────────────────────────────

const COLOR_OPTIONS: ColorOption[] = [
  { id: 'pink',   label: 'Rosa Dulce',   hex: '#FBAEAE', tailwind: 'bg-brand-pink',   attributeValue: 'Rosa Dulce'   },
  { id: 'mint',   label: 'Verde Menta',  hex: '#B1E5D5', tailwind: 'bg-brand-mint',   attributeValue: 'Verde Menta'  },
  { id: 'blue',   label: 'Azul Cielo',   hex: '#B0DDF0', tailwind: 'bg-brand-blue',   attributeValue: 'Azul Cielo'   },
  { id: 'yellow', label: 'Amarillo Sol', hex: '#FDE29F', tailwind: 'bg-brand-yellow', attributeValue: 'Amarillo Sol' },
]

const STEP_LABELS = [
  '¿Tu color favorito?',
  'Ese nombre especial',
  'El toque final',
]

// ─── Animaciones ─────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
  }),
}

// ─── Sub-componentes de pasos ─────────────────────────────────────────────────

function PasoBienvenida({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-6"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl mb-4"
      >
        🎀
      </motion.div>
      <h2 className="font-heading text-3xl text-text-main mb-3">
        ¡Vamos a crear algo único!
      </h2>
      <p className="font-body text-text-muted text-base max-w-xs mx-auto leading-relaxed mb-8">
        Solo 3 pasitos y tu detalle personalizado estará listo para enamorar.
      </p>
      <button
        onClick={onStart}
        className="
          bg-action-primary hover:bg-action-hover
          text-white font-body font-semibold
          px-8 py-3.5 rounded-full
          shadow-soft-pink
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-lg
          active:scale-95
        "
      >
        Empezar a personalizar ✨
      </button>
    </motion.div>
  )
}

function PasoColor({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div>
      <p className="font-body text-text-muted text-sm text-center mb-6">
        Elige el color que más te guste para tu detalle
      </p>
      <div className="grid grid-cols-2 gap-4">
        {COLOR_OPTIONS.map((color) => (
          <motion.button
            key={color.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(color.id)}
            className={`
              relative flex flex-col items-center gap-3
              p-5 rounded-3xl border-2 transition-all duration-250
              ${selected === color.id
                ? 'border-text-main shadow-soft-lg bg-white'
                : 'border-transparent bg-white/60 hover:bg-white shadow-soft'
              }
            `}
            aria-label={`Seleccionar ${color.label}`}
            aria-pressed={selected === color.id}
          >
            {/* Círculo de color */}
            <div
              className="w-14 h-14 rounded-full shadow-soft transition-transform duration-200"
              style={{ backgroundColor: color.hex }}
            />
            <span className="font-body text-sm font-medium text-text-main">
              {color.label}
            </span>
            {/* Check de selección */}
            <AnimatePresence>
              {selected === color.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-2.5 right-2.5"
                >
                  <CheckCircleIcon className="w-5 h-5 text-text-main" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function PasoTexto({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="font-body text-text-muted text-sm text-center mb-6">
        Escribe el texto que aparecerá en tu detalle personalizado
      </p>
      {/* Live preview */}
      <div
        className="
          bg-white rounded-3xl shadow-soft p-6 mb-5
          min-h-[80px] flex items-center justify-center
          border border-brand-pink-light
        "
      >
        <p
          className="font-heading text-2xl text-text-main text-center break-words"
          style={{ minHeight: '1.5em' }}
        >
          {value || (
            <span className="text-text-muted/40">Tu texto aparecerá aquí...</span>
          )}
        </p>
      </div>
      {/* Input */}
      <div className="relative">
        <input
          id="texto-personalizado"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={40}
          placeholder="Ej: Te quiero mamá, Ana y Luis..."
          className="
            w-full font-body text-base text-text-main
            bg-white rounded-2xl border border-brand-pink-light
            px-5 py-4 outline-none
            focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20
            transition-all duration-200 shadow-soft
            placeholder:text-text-muted/50
          "
          aria-label="Texto personalizado del producto"
        />
        <span className="absolute right-4 bottom-3.5 font-body text-xs text-text-muted">
          {value.length}/40
        </span>
      </div>
    </div>
  )
}

function PasoImagen({
  file,
  onFile,
}: {
  file: File | null
  onFile: (f: File | null) => void
}) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const dropped = e.dataTransfer.files[0]
      if (dropped?.type.startsWith('image/')) onFile(dropped)
    },
    [onFile]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) onFile(selected)
  }

  return (
    <div>
      <p className="font-body text-text-muted text-sm text-center mb-6">
        Opcional — añade una foto para que el detalle sea todavía más especial
      </p>
      <label
        htmlFor="imagen-upload"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="
          block cursor-pointer
          border-2 border-dashed border-brand-pink
          rounded-3xl p-8 text-center
          bg-brand-pink-light/30 hover:bg-brand-pink-light/60
          transition-all duration-300 group
        "
        aria-label="Área para subir imagen personalizada"
      >
        {file ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Preview de la imagen */}
            <img
              src={URL.createObjectURL(file)}
              alt="Vista previa"
              className="w-24 h-24 rounded-2xl object-cover shadow-soft"
            />
            <p className="font-body text-sm font-medium text-text-main">{file.name}</p>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); onFile(null) }}
              className="font-body text-xs text-text-muted hover:text-brand-pink transition-colors"
            >
              Cambiar foto
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <PhotoIcon className="w-12 h-12 text-brand-pink/60 group-hover:text-brand-pink transition-colors" />
            <p className="font-body text-sm font-medium text-text-main">
              Sube esa foto que os hace sonreír 📸
            </p>
            <p className="font-body text-xs text-text-muted">
              Arrastra aquí o haz clic para seleccionar
            </p>
          </div>
        )}
      </label>
      <input
        id="imagen-upload"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
        aria-hidden="true"
      />
      <p className="font-body text-xs text-text-muted/70 text-center mt-3">
        Formatos admitidos: JPG, PNG, WEBP · Máx. 5 MB
      </p>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ConfiguradorMagico({
  variantId,
  productName = 'tu detalle personalizado',
}: ConfiguradorMagicoProps) {
  const [started, setStarted]         = useState(false)
  const [step, setStep]               = useState(0)        // 0=color, 1=texto, 2=imagen
  const [direction, setDirection]     = useState(1)
  const [colorId, setColorId]         = useState<string | null>(null)
  const [texto, setTexto]             = useState('')
  const [imagen, setImagen]           = useState<File | null>(null)
  const [loading, setLoading]         = useState(false)
  const [success, setSuccess]         = useState(false)
  const [error, setError]             = useState<string | null>(null)

  const totalSteps = 3

  // Navegar entre pasos
  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1)
      setStep((s) => s + 1)
    }
  }
  const goBack = () => {
    if (step > 0) {
      setDirection(-1)
      setStep((s) => s - 1)
    }
  }

  // Validación por paso
  const canProceed = () => {
    if (step === 0) return colorId !== null
    if (step === 1) return texto.trim().length > 0
    return true // El paso 3 (imagen) es opcional
  }

  // Mock de URL de imagen (simulado sin Cloudinary)
  const getMockImageUrl = (file: File | null) => {
    if (!file) return null
    return `mock://impresitos/uploads/${Date.now()}_${file.name}`
  }

  // Submit final
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const colorOption = COLOR_OPTIONS.find((c) => c.id === colorId)
    const mockImageUrl = getMockImageUrl(imagen)

    // Construir los custom attributes para Shopify
    const attributes = [
      { key: 'Color elegido', value: colorOption?.attributeValue ?? '' },
      { key: 'Texto personalizado', value: texto.trim() },
      ...(mockImageUrl
        ? [{ key: 'Imagen (pendiente de subir)', value: mockImageUrl }]
        : []),
    ]

    try {
      await addToCart(variantId, 1, attributes)
      setSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ha ocurrido un error. Por favor, inténtalo de nuevo.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ── Pantalla de éxito ──
  if (success) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-10"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-7xl mb-5"
        >
          🎉
        </motion.div>
        <h2 className="font-heading text-3xl text-text-main mb-3">
          ¡Lo estamos preparando con cariño!
        </h2>
        <p className="font-body text-text-muted text-base max-w-xs mx-auto mb-8 leading-relaxed">
          Tu {productName} personalizado ya está en el carrito. Solo queda un paso más.
        </p>
        <button
          onClick={() => window.location.href = '/carrito'}
          className="
            bg-action-primary hover:bg-action-hover text-white
            font-body font-semibold px-8 py-3.5 rounded-full
            shadow-soft-pink transition-all duration-300
            hover:-translate-y-0.5
          "
        >
          Ver mi carrito 🛒
        </button>
      </motion.div>
    )
  }

  // ── Pantalla de bienvenida ──
  if (!started) {
    return <PasoBienvenida onStart={() => setStarted(true)} />
  }

  // ── Stepper principal ──
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Indicador de pasos */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                font-body text-sm font-semibold
                transition-all duration-300
                ${i < step
                  ? 'bg-brand-mint text-text-main'
                  : i === step
                  ? 'bg-action-primary text-white shadow-soft-pink'
                  : 'bg-white border-2 border-brand-pink-light text-text-muted'
                }
              `}
            >
              {i < step ? <CheckCircleIcon className="w-4 h-4" /> : i + 1}
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`
                  h-0.5 w-8 rounded-full transition-all duration-500
                  ${i < step ? 'bg-brand-mint' : 'bg-brand-pink-light'}
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Título del paso actual */}
      <AnimatePresence mode="wait">
        <motion.h3
          key={`title-${step}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="font-heading text-2xl text-text-main text-center mb-6"
        >
          {STEP_LABELS[step]}
        </motion.h3>
      </AnimatePresence>

      {/* Contenido del paso con animación de slide */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={`step-${step}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {step === 0 && (
            <PasoColor selected={colorId} onSelect={setColorId} />
          )}
          {step === 1 && (
            <PasoTexto value={texto} onChange={setTexto} />
          )}
          {step === 2 && (
            <PasoImagen file={imagen} onFile={setImagen} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-body text-sm text-red-400 text-center mt-4"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Botones de navegación */}
      <div className="flex items-center justify-between mt-8 gap-3">
        {step > 0 ? (
          <button
            onClick={goBack}
            className="
              font-body text-sm font-medium text-text-muted
              hover:text-text-main transition-colors
              px-5 py-3 rounded-full hover:bg-white hover:shadow-soft
            "
            aria-label="Paso anterior"
          >
            ← Volver
          </button>
        ) : (
          <div /> // Spacer
        )}

        {step < totalSteps - 1 ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={goNext}
            disabled={!canProceed()}
            className="
              bg-action-primary hover:bg-action-hover disabled:opacity-40
              text-white font-body font-semibold
              px-7 py-3 rounded-full
              shadow-soft-pink disabled:shadow-none
              transition-all duration-300 hover:-translate-y-0.5
              disabled:cursor-not-allowed disabled:hover:translate-y-0
              flex items-center gap-2
            "
            aria-label="Siguiente paso"
          >
            Siguiente
            <SparklesIcon className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className="
              bg-action-primary hover:bg-action-hover disabled:opacity-60
              text-white font-body font-semibold
              px-7 py-3.5 rounded-full
              shadow-soft-pink
              transition-all duration-300 hover:-translate-y-0.5
              flex items-center gap-2 text-base
            "
            aria-label="Añadir al carrito con personalización"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Preparando...
              </>
            ) : (
              <>¡Preparar con cariño! 🎀</>
            )}
          </motion.button>
        )}
      </div>

      {/* Nota de paso opcional */}
      {step === 2 && (
        <p className="font-body text-xs text-text-muted/70 text-center mt-4">
          La foto es opcional. Puedes saltar este paso si lo prefieres.
        </p>
      )}
    </div>
  )
}

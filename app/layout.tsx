import type { Metadata } from 'next'
import { Fredoka, DM_Sans } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Impresitos — Detalles personalizados para tus momentos especiales',
  description:
    'Marcadores, llaveros y postales personalizados en impresión 3D. Bonitos, asequibles y hechos con cariño para tus celebraciones en España.',
  keywords: [
    'regalos personalizados',
    'impresión 3D',
    'bodas',
    'bautizos',
    'comuniones',
    'cumpleaños',
    'España',
    'detalles boda',
    'llaveros personalizados',
  ],
  openGraph: {
    title: 'Impresitos — Detalles personalizados para tus momentos especiales',
    description: 'Marcadores, llaveros y postales en impresión 3D hechos con cariño.',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${fredoka.variable} ${dmSans.variable}`}>
      <body className="font-body bg-background text-text-main antialiased">
        {children}
      </body>
    </html>
  )
}

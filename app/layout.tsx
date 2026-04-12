import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SplashCursor } from '@/components/ui/splash-cursor'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { MoreSpaceZoom } from '@/components/more-space-zoom'

const inter = Inter({ subsets: ['latin'], weight: ['200','300'] })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400','500','600','700','800','900'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: "Lance's Portfolio",
  description: 'Built by Lance Y, Co-Founder and CEO of Traverse (YC W26)',
  icons: { icon: '/lance new logo.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#fff' }}>
      <head>
        <link rel="preload" as="video" href="/white-to-black.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/black-to-white.mp4" type="video/mp4" />
      </head>
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

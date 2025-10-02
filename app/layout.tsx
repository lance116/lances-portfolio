import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SplashCursor } from '@/components/ui/splash-cursor'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'], weight: ['200','300'] })

export const metadata: Metadata = {
  title: "Lance's Portfolio",
  description: 'Sparse, minimal online résumé',
  icons: { icon: '/logo L.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SplashCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SplashCursor } from '@/components/ui/splash-cursor'

const inter = Inter({ subsets: ['latin'], weight: ['200','300'] })

export const metadata: Metadata = {
  title: 'Lance Yan S',
  description: 'Sparse, minimal online résumé',
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
      </body>
    </html>
  )
}

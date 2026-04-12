import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'], weight: ['200','300'] })
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400','700'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Lance Yan',
  description: "Lance's website, Co-Founder and CEO of Traverse (YC W26)",
  icons: { icon: '/lance new logo.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#fff' }}>
      <body className={`${inter.className} ${libreBaskerville.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

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
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

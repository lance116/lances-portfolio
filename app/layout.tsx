import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SplashCursor } from '@/components/ui/splash-cursor'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], weight: ['200','300'] })

export const metadata: Metadata = {
  title: "Lance's Portfolio",
  description: 'Built by Lance Y.',
  icons: { icon: '/logo L.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <SplashCursor />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

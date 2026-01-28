import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SplashCursor } from '@/components/ui/splash-cursor'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { MoreSpaceZoom } from '@/components/more-space-zoom'

const inter = Inter({ subsets: ['latin'], weight: ['200','300'] })

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
                // Ensure no white flash on page load
                document.documentElement.style.backgroundColor = theme === 'dark' ? '#000' : '#fff';
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <MoreSpaceZoom />
          <SplashCursor />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Fira_Code, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" })
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif" })

export const metadata: Metadata = {
  title: "AIDFest - Artificial Intelligence and Data Festival",
  description:
    "Bring together practitioners, solution builders, and government agencies to strengthen shared capability on data for AI.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`font-sans antialiased ${firaCode.variable} ${_geistMono.variable} ${instrumentSerif.variable} bg-background text-foreground`}>
        {children}
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}

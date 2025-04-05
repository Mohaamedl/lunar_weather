import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ParticleBackground } from "@/components/particle-background"
import { ThemeProvider } from "@/components/theme-provider"
import { LocationProvider } from "@/contexts/location-context"
import  { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import  React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export const metadata = {
  title: "Lunar Weather",
  description: "A celestial weather experience with moon-themed aesthetics",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LocationProvider>
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background-secondary">
              <ParticleBackground />
              <div className="flex-1 flex flex-col relative z-10">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 pt-20 pb-20">{children}</main>
                <Footer />
              </div>
            </div>
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'

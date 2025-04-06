import { Github, Mail, Moon, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full mt-auto relative">
      <div className="relative">
        {/* Crescent Moon Shape */}
        <div className="relative left-0 right-0 bottom-0 h-52 bg-card/30 backdrop-blur-sm clip-path-crescent pointer-events-auto">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Moon className="h-5 w-5 text-accent" />
                  <span className="text-lg font-bold">Lunar Weather</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A celestial weather experience with moon-themed aesthetics
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Quick Links</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <Link
                    href="/forecast"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forecast
                  </Link>
                  <Link
                    href="/recommendations"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Outfit & Activity
                  </Link>
                  <Link href="/moon" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Moon Phases
                  </Link>
                  <Link
                    href="/report"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Report Issue
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Connect</h4>
                <div className="flex space-x-4">
                  <Link href="https://github.com/Mohaamedl/lunar_weather"  target="_blanc" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground">Weather data provided by OpenWeather API</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Lunar Weather. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


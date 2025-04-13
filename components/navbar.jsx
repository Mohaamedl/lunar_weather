"use client"

import { LocationSearch } from "@/components/location-search"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useLocation } from "@/contexts/location-context"
import { cn } from "@/lib/utils"
import { AlertCircle, Calendar, Home, MapPin, Menu, Moon, Settings, Shirt, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Forecast", href: "/forecast", icon: Calendar },
  { name: "Outfit & Activity", href: "/recommendations", icon: Shirt },
  { name: "Moon Phases", href: "/moon", icon: Moon },
  { name: "Report Issue", href: "/report", icon: AlertCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { location } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Format location display text
  const getLocationText = () => {
    if (!location) return "Location"
    if (location.city) return location.city
    if (location.lat && location.lon) {
      return `${parseFloat(location.lat).toFixed(2)}, ${parseFloat(location.lon).toFixed(2)}`
    }
    return  "Location"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="px-2 xs:px-4 md:container flex h-12 xs:h-14 md:h-16 items-center justify-between">
        <div className="flex items-center gap-1 xs:gap-1.5 md:gap-2">
          <Moon className="h-4 w-4 xs:h-5 xs:w-5 md:h-6 md:w-6" />
          <Link href="/" className="text-sm xs:text-base md:text-lg font-semibold">
            <span className="inline xs:hidden">LW</span>
            <span className="hidden xs:inline">Lunar Weather</span>
          </Link>
        </div>

        <nav className="flex items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-2.5 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "text-primary glow bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                  )}
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Location Search (Desktop) */}
          <div className="hidden md:flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center h-8 xs:h-9 px-2 xs:px-3">
                  <MapPin className="h-4 w-4 mr-1 xs:mr-1.5 flex-shrink-0 text-accent" />
                  <span className="text-xs xs:text-sm truncate">{getLocationText()}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full max-w-md mx-auto">
                <SheetHeader>
                  <SheetTitle>Change Location</SheetTitle>
                  <SheetDescription>Enter a city name to get weather information for that location</SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <LocationSearch />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 xs:h-9 xs:w-9 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4 xs:h-5 xs:w-5" /> : <Menu className="h-4 w-4 xs:h-5 xs:w-5" />}
          </Button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-card/95 backdrop-blur-lg px-2 xs:px-4 py-2 xs:py-3 border-t border-border animate-accordion-down">
          <div className="grid gap-1.5 xs:gap-2">
            {/* Location Search (Mobile) */}
            <div className="mb-1">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center h-8 xs:h-9 text-xs xs:text-sm">
                    <MapPin className="h-3 w-3 xs:h-4 xs:w-4 mr-1 xs:mr-1.5 text-accent" />
                    <span className="truncate">{getLocationText()}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="w-full">
                  <SheetHeader>
                    <SheetTitle>Change Location</SheetTitle>
                    <SheetDescription>Enter a city name to get weather information</SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <LocationSearch />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-2 xs:px-2.5 py-1 xs:py-1.5 text-xs xs:text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "text-primary glow bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                  )}
                >
                  <Icon className="h-3 w-3 xs:h-4 xs:w-4 mr-1 xs:mr-1.5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}


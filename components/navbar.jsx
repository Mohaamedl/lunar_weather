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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Moon className="h-8 w-8 text-accent glow-accent" />
            <span className="text-xl font-bold tracking-tight">Lunar Weather</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "text-primary glow bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Location Search (Desktop) */}
          <div className="hidden md:flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-accent" />
                  <span className="text-sm truncate max-w-[150px]">{location}</span>
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
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-card/95 backdrop-blur-lg p-4 border-t border-border animate-accordion-down">
          <div className="grid gap-4">
            {/* Location Search (Mobile) */}
            <div className="mb-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    <span className="text-sm truncate">{location}</span>
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
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "text-primary glow bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
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


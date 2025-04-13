"use client"

import { Button } from "@/components/ui/button"
import Cookies from 'js-cookie'
import Link from "next/link"
import { useEffect, useState } from "react"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = Cookies.get('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    Cookies.set('cookie-consent', 'all', { expires: 365 })
    setShowBanner(false)
  }

  const acceptEssential = () => {
    Cookies.set('cookie-consent', 'essential', { expires: 365 })
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-t">
      <div className="container flex flex-col sm:flex-row gap-4 py-4 items-center justify-between">
        <div className="flex-1 text-sm">
          We use cookies to improve your experience. By using our site, you agree to our 
          <Link href="/cookies-policy" className="underline mx-1">cookie policy</Link>.
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={acceptEssential}>
            Essential Only
          </Button>
          <Button size="sm" onClick={acceptAll}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}

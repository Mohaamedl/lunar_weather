"use client"

import { useEffect, useState } from "react"

export default function LegalLayout({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container max-w-3xl py-12">
      <div className="prose dark:prose-invert">
        {children}
      </div>
    </div>
  )
}

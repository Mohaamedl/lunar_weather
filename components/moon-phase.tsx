"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { JSX } from "react"

interface MoonPhaseProps {
  phase: number // 0-1 representing new moon (0) to full moon (0.5) to new moon (1)
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function MoonPhase({ phase, size = "md", className }: MoonPhaseProps) {
  const [moonPhaseElement, setMoonPhaseElement] = useState<JSX.Element | null>(null)

  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-40 h-40",
  }

  useEffect(() => {
    // Normalize phase to 0-1
    const normalizedPhase = phase % 1

    // Calculate shadow position based on moon phase
    const shadowPosition =
      normalizedPhase <= 0.5
        ? -50 + normalizedPhase * 200 // 0 to 0.5 moves shadow from left to right
        : 50 - (normalizedPhase - 0.5) * 200 // 0.5 to 1 moves shadow from right to left

    // Determine if waxing (growing) or waning (shrinking)
    const isWaxing = normalizedPhase <= 0.5

    // Create moon phase visualization
    const moonElement = (
      <div className={cn("relative rounded-full overflow-hidden", sizeMap[size], className)}>
        {/* Moon base */}
        <div className="absolute inset-0 rounded-full bg-gray-200"></div>

        {/* Shadow overlay */}
        <div
          className={cn("absolute inset-0 rounded-full bg-background", isWaxing ? "left-0" : "right-0")}
          style={{
            width: "100%",
            transform: `translateX(${shadowPosition}%)`,
          }}
        ></div>

        {/* Moon texture overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
          from-transparent via-gray-500 to-transparent"
        ></div>
      </div>
    )

    setMoonPhaseElement(moonElement)
  }, [phase, size, className])

  return moonPhaseElement
}


"use client"

import { cn } from "@/lib/utils"
import { Hemisphere, LunarPhase, Moon } from "lunarphase-js"

interface MoonPhaseProps {
  phase: number
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" // added new sizes
  className?: string
  hemisphere?: "northern" | "southern"
}

export function MoonPhase({ 
  phase,
  size = "md", 
  className,
  hemisphere = "northern" 
}: MoonPhaseProps) {
  const sizeMap = {
    sm: "text-4xl",
    md: "text-6xl",
    lg: "text-8xl",
    xl: "text-[12rem]",
    "2xl": "text-[16rem]",
    "3xl": "text-[20rem]", // very large size
  }

  // Convert phase (0-1) to lunar phase enum
  const getLunarPhase = (phase: number): LunarPhase => {
    if (phase < 0.03 || phase > 0.97) return LunarPhase.NEW
    if (phase < 0.22) return LunarPhase.WAXING_CRESCENT
    if (phase < 0.28) return LunarPhase.FIRST_QUARTER
    if (phase < 0.47) return LunarPhase.WAXING_GIBBOUS
    if (phase < 0.53) return LunarPhase.FULL
    if (phase < 0.72) return LunarPhase.WANING_GIBBOUS
    if (phase < 0.78) return LunarPhase.LAST_QUARTER
    return LunarPhase.WANING_CRESCENT
  }

  // Get emoji for the specific phase
  const emoji = Moon.emojiForLunarPhase(
    getLunarPhase(phase),
    { hemisphere: hemisphere === "northern" ? Hemisphere.NORTHERN : Hemisphere.SOUTHERN }
  )

  return (
    <div 
      className={cn("flex items-center justify-center", sizeMap[size], className)}
      title={`${Math.round(phase * 100)}% illuminated`}
    >
      {emoji}
    </div>
  )
}


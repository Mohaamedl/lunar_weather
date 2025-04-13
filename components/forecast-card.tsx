"use client"

import { MoonPhase } from "@/components/moon-phase"
import { Card, CardContent } from "@/components/ui/card"
import { WeatherIcon } from "@/components/weather-icon"
import { useLocation } from "@/contexts/location-context"
import { cn } from "@/lib/utils"

interface ForecastCardProps {
  day: string
  date: string
  high: number
  low: number
  condition: string
  moonPhase: number
  precipitation: number
  className?: string
}

export function ForecastCard({
  day,
  date,
  high,
  low,
  condition,
  moonPhase = 0,
  precipitation = 0,
  className,
}: ForecastCardProps) {
  const { temperatureUnit } = useLocation()

  const displayHigh = temperatureUnit === "imperial" ? Math.round(high * 9/5 + 32) : high
  const displayLow = temperatureUnit === "imperial" ? Math.round(low * 9/5 + 32) : low

  return (
    <Card className={cn("relative overflow-hidden border-none bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm hover:from-card/90 hover:to-card/50 transition-all duration-300", className)}>
      <CardContent className="p-6">
        <div className="grid grid-cols-[1fr,auto] gap-4">
          <div className="space-y-1">
            <div className="text-base font-semibold">{day}</div>
            <div className="text-xs text-muted-foreground">{date}</div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-lg font-bold">
              {displayHigh}°{temperatureUnit === "imperial" ? "F" : "C"}
            </div>
            <div className="text-sm text-muted-foreground">
              {displayLow}°{temperatureUnit === "imperial" ? "F" : "C"}
            </div>
          </div>

          <div className="col-span-2 flex items-center gap-3 mt-2">
            <WeatherIcon condition={condition} size={32} />
            <div className="flex-1 flex items-center justify-between">
              <MoonPhase phase={moonPhase} size="sm" />
              <div className="text-xs bg-muted/50 px-2 py-1 rounded-full">
                {precipitation > 0 ? `${precipitation}%` : "0%"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


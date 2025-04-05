import { Card, CardContent } from "@/components/ui/card"
import { WeatherIcon } from "@/components/weather-icon"
import { MoonPhase } from "@/components/moon-phase"
import { cn } from "@/lib/utils"
import { useLocation } from "@/contexts/location-context"

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
  moonPhase,
  precipitation,
  className,
}: ForecastCardProps) {
  const { unitSymbol } = useLocation()

  return (
    <Card className={cn("overflow-hidden border-none bg-card/60 backdrop-blur-sm card-hover-effect", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium">{day}</div>
          <div className="text-xs text-muted-foreground mb-3">{date}</div>

          <WeatherIcon condition={condition} size={36} className="mb-3" />

          <div className="flex items-center justify-between w-full mb-3">
            <span className="text-sm font-medium">
              {high}
              {unitSymbol}
            </span>
            <span className="text-xs text-muted-foreground">
              {low}
              {unitSymbol}
            </span>
          </div>

          <div className="flex items-center justify-between w-full">
            <MoonPhase phase={moonPhase} size="sm" />
            <div className="text-xs text-muted-foreground">
              {precipitation > 0 ? `${precipitation}% precip.` : "No precipitation"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


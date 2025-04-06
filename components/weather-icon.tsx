import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  SunDim,
  Wind,
  Snowflake,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WeatherIconProps {
  condition: string
  className?: string
  size?: number
}

export function WeatherIcon({ condition, className, size = 24 }: WeatherIconProps) {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return <Sun className={cn("text-accent glow-accent", className)} size={size} />
      case "partly cloudy":
      case "mostly cloudy":
        return <SunDim className={cn("text-accent/80", className)} size={size} />
      case "cloudy":
      case "overcast":
        return <Cloud className={className} size={size} />
      case "fog":
      case "mist":
        return <CloudFog className={className} size={size} />
      case "drizzle":
        return <CloudDrizzle className={className} size={size} />
      case "rain":
      case "showers":
        return <CloudRain className={className} size={size} />
      case "thunderstorm":
      case "thunder":
        return <CloudLightning className={className} size={size} />
      case "snow":
      case "sleet":
        return <CloudSnow className={className} size={size} />
      case "blizzard":
        return <Snowflake className={className} size={size} />
      case "windy":
        return <Wind className={className} size={size} />
      default:
        return <Sun className={cn("text-accent", className)} size={size} />
    }
  }

  return getIcon()
}


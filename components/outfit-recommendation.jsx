import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatTemperature } from "@/lib/utils/weather"
import { Shirt, Sun, Umbrella } from "lucide-react"

export function OutfitRecommendation({ temperature, condition, windSpeed, precipitation, className }) {
  // Determine clothing recommendations based on weather
  const getClothingRecommendation = () => {
    if (temperature > 27) { // ~80°F
      return {
        top: "Light t-shirt or tank top",
        bottom: "Shorts or light pants",
        accessories: precipitation > 30 ? "Umbrella" : "Sunglasses, hat",
        footwear: "Sandals or light shoes",
      }
    } else if (temperature > 18) { // ~65°F
      return {
        top: "T-shirt or light long sleeve",
        bottom: "Light pants or jeans",
        accessories: precipitation > 30 ? "Light jacket, umbrella" : "Sunglasses",
        footwear: "Sneakers or casual shoes",
      }
    } else if (temperature > 10) { // ~50°F
      return {
        top: "Long sleeve shirt or light sweater",
        bottom: "Jeans or pants",
        accessories: precipitation > 30 ? "Rain jacket" : windSpeed > 10 ? "Light jacket" : "Light scarf",
        footwear: "Closed shoes or boots",
      }
    } else if (temperature > 2) { // ~35°F
      return {
        top: "Sweater or light jacket",
        bottom: "Warm pants",
        accessories: precipitation > 30 ? "Waterproof jacket, umbrella" : "Scarf, gloves",
        footwear: "Boots or warm shoes",
      }
    } else {
      return {
        top: "Heavy sweater and coat",
        bottom: "Thermal pants or jeans with thermals",
        accessories: "Scarf, gloves, hat",
        footwear: "Insulated boots",
      }
    }
  }

  const clothing = getClothingRecommendation()

  // Determine activity recommendations
  const getActivityRecommendation = () => {
    if (precipitation > 50) {
      return {
        recommended: ["Indoor activities", "Museum visits", "Movie night"],
        notRecommended: ["Hiking", "Beach visits", "Outdoor sports"],
      }
    } else if (temperature > 24 && precipitation < 30) { // Changed from 75°F to 24°C
      return {
        recommended: ["Beach visits", "Swimming", "Outdoor dining", "Park visits"],
        notRecommended: ["Strenuous hiking", "Heavy exercise outdoors"],
      }
    } else if (temperature > 16 && precipitation < 30) { // Changed from 60°F to 16°C
      return {
        recommended: ["Hiking", "Outdoor sports", "Picnics", "Sightseeing"],
        notRecommended: ["Water activities"],
      }
    } else if (temperature > 4) { // Changed from 40°F to 4°C
      return {
        recommended: ["Light hiking", "City walks", "Shopping", "Coffee shops"],
        notRecommended: ["Water activities", "Extended outdoor stays"],
      }
    } else {
      return {
        recommended: ["Indoor activities", "Short walks", "Hot drinks at cafes"],
        notRecommended: ["Extended outdoor activities", "Water sports"],
      }
    }
  }

  const activities = getActivityRecommendation()

  return (
    <Card className={cn("border-none bg-card/60 backdrop-blur-sm", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shirt className="mr-2 h-5 w-5 text-accent" />
          Today's Recommendations
        </CardTitle>
        <CardDescription>
          Based on {formatTemperature(temperature, 'C')}, {condition.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">What to Wear</h3>
          <ul className="grid gap-2">
            <li className="flex items-start">
              <span className="font-medium mr-2">Top:</span> {clothing.top}
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Bottom:</span> {clothing.bottom}
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Accessories:</span> {clothing.accessories}
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Footwear:</span> {clothing.footwear}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Recommended Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Sun className="mr-2 h-4 w-4 text-green-400" />
                <span className="font-medium">Great for:</span>
              </div>
              <ul className="list-disc list-inside text-sm pl-2">
                {activities.recommended.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Umbrella className="mr-2 h-4 w-4 text-red-400" />
                <span className="font-medium">Not ideal for:</span>
              </div>
              <ul className="list-disc list-inside text-sm pl-2">
                {activities.notRecommended.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


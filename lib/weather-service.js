// Convert OpenWeather condition to our app's condition format
export function mapWeatherCondition(condition) {
  const conditionMap = {
    Clear: "Clear",
    Clouds: "Cloudy",
    "Few clouds": "Partly Cloudy",
    "Scattered clouds": "Partly Cloudy",
    "Broken clouds": "Mostly Cloudy",
    "Shower rain": "Showers",
    Rain: "Rain",
    Thunderstorm: "Thunderstorm",
    Snow: "Snow",
    Mist: "Fog",
    Drizzle: "Drizzle",
    Fog: "Fog",
    Haze: "Fog",
    Smoke: "Fog",
    Dust: "Fog",
    Sand: "Fog",
    Ash: "Fog",
    Squall: "Windy",
    Tornado: "Windy",
  }

  // Check if the condition exists in our map
  if (condition in conditionMap) {
    return conditionMap[condition]
  }

  // If we have a partial match
  for (const key in conditionMap) {
    if (condition.toLowerCase().includes(key.toLowerCase())) {
      return conditionMap[key]
    }
  }

  // Default fallback
  return "Clear"
}

// Format city name to be more reliable with OpenWeather API
export function formatCityForApi(city) {
  // Remove any extra spaces and commas
  return city.trim().replace(/\s+/g, " ")
}

// Get current weather data
export async function getCurrentWeather(city, units = "metric") {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!apiKey) {
    console.error("OpenWeather API key is not defined" )
    throw new Error("OpenWeather API key is not defined")
  }

  const formattedCity = formatCityForApi(city)
  console.log(`Fetching weather for: ${formattedCity}`)

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formattedCity)}&units=${units}&appid=${apiKey}`,
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Weather API error: ${response.status}`, errorText)

      if (response.status === 404) {
        throw new Error(`City not found. Please check the city name and try again.`)
      }

      throw new Error(`Weather API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

// Get forecast data
export async function getForecast(city, units = "imperial") {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!apiKey) {
    console.error("OpenWeather API key is not defined")
    throw new Error("OpenWeather API key is not defined")
  }

  const formattedCity = formatCityForApi(city)
  console.log(`Fetching forecast for: ${formattedCity}`)

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(formattedCity)}&units=${units}&appid=${apiKey}`,
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Forecast API error: ${response.status}`, errorText)

      if (response.status === 404) {
        throw new Error(`City not found. Please check the city name and try again.`)
      }

      throw new Error(`Forecast API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    throw error
  }
}

// Calculate moon phase (0-1) based on date
export function getMoonPhase(date = new Date()) {
  // This is a simplified calculation
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Calculate approximate days since known new moon (Jan 6, 2000)
  const knownNewMoon = new Date(2000, 0, 6).getTime()
  const currentDate = new Date(year, month - 1, day).getTime()
  const daysSinceKnownNewMoon = (currentDate - knownNewMoon) / (1000 * 60 * 60 * 24)

  // Moon cycle is approximately 29.53 days
  const moonCycle = 29.53

  // Calculate phase (0 to 1)
  const phase = (daysSinceKnownNewMoon % moonCycle) / moonCycle

  return phase
}

// Get moon phase name based on phase value
export function getMoonPhaseName(phase) {
  if (phase < 0.03 || phase >= 0.97) return "New Moon"
  if (phase < 0.22) return "Waxing Crescent"
  if (phase < 0.28) return "First Quarter"
  if (phase < 0.47) return "Waxing Gibbous"
  if (phase < 0.53) return "Full Moon"
  if (phase < 0.72) return "Waning Gibbous"
  if (phase < 0.78) return "Last Quarter"
  return "Waning Crescent"
}

// Format date for display
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

// Format day name
export function formatDay(date, today = false) {
  if (today) return "Today"
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date)
}

// Group forecast data by day
export function groupForecastByDay(forecast) {
  const days = {}

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const dateKey = date.toISOString().split("T")[0]

    if (!days[dateKey]) {
      days[dateKey] = {
        date: new Date(date),
        temps: [],
        conditions: [],
        precipitation: [],
        wind: [],
      }
    }

    days[dateKey].temps.push(item.main.temp)
    days[dateKey].conditions.push(item.weather[0].main)
    days[dateKey].precipitation.push(item.pop * 100)
    days[dateKey].wind.push(item.wind.speed)
  })

  // Process each day's data
  return Object.values(days)
    .map((day) => {
      const temps = day.temps
      const high = Math.round(Math.max(...temps))
      const low = Math.round(Math.min(...temps))

      // Get most common condition
      const conditionCounts = {}
      day.conditions.forEach((condition) => {
        conditionCounts[condition] = (conditionCounts[condition] || 0) + 1
      })
      let mostCommonCondition = day.conditions[0]
      let maxCount = 0

      for (const condition in conditionCounts) {
        if (conditionCounts[condition] > maxCount) {
          maxCount = conditionCounts[condition]
          mostCommonCondition = condition
        }
      }

      // Calculate average precipitation chance
      const avgPrecipitation = Math.round(
        day.precipitation.reduce((sum, val) => sum + val, 0) / day.precipitation.length,
      )

      return {
        date: day.date,
        high,
        low,
        condition: mapWeatherCondition(mostCommonCondition),
        precipitation: avgPrecipitation,
        moonPhase: getMoonPhase(day.date),
      }
    })
    .slice(0, 7) // Limit to 7 days
}

// Generate mock weather data for fallback
export function getMockWeatherData() {
  return {
    coord: { lon: -74.006, lat: 40.7143 },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 72,
      feels_like: 71,
      temp_min: 68,
      temp_max: 75,
      pressure: 1015,
      humidity: 65,
    },
    visibility: 10000,
    wind: {
      speed: 8,
      deg: 220,
    },
    clouds: {
      all: 0,
    },
    dt: Date.now() / 1000,
    sys: {
      type: 2,
      id: 2039034,
      country: "US",
      sunrise: Date.now() / 1000 - 12 * 3600,
      sunset: Date.now() / 1000 + 12 * 3600,
    },
    timezone: -14400,
    id: 5128581,
    name: "New York",
    cod: 200,
  }
}

// Generate mock forecast data for fallback
export function getMockForecastData() {
  const today = new Date()
  const forecast = []

  for (let i = 0; i < 5; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    forecast.push({
      date: date,
      high: 72 - i * 2,
      low: 58 - i * 2,
      condition: i === 0 ? "Clear" : i === 1 ? "Partly Cloudy" : i === 2 ? "Cloudy" : i === 3 ? "Rain" : "Showers",
      precipitation: i === 0 ? 0 : i === 1 ? 10 : i === 2 ? 30 : i === 3 ? 80 : 60,
      moonPhase: 0.25 + i * 0.03,
    })
  }

  return forecast
}


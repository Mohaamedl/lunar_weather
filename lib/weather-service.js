import { weatherCache } from "@/lib/utils/cache"

const BASE_URL = 'https://api.openweathermap.org/data'

// Format city name to be more reliable with OpenWeather API
export function formatCityForApi(city) {
  return city.trim().replace(/\s+/g, " ")
}

// Helper function to validate location parameters
function validateLocationParams(params) {
  if (typeof params === 'string') {
    return params.trim().length > 0
  }

  if (!params || typeof params !== 'object') return false

  if (params.city) {
    return typeof params.city === 'string' && params.city.trim().length > 0
  }

  if (params.lat && params.lon) {
    const lat = parseFloat(params.lat)
    const lon = parseFloat(params.lon)
    return !isNaN(lat) && !isNaN(lon) && 
           lat >= -90 && lat <= 90 && 
           lon >= -180 && lon <= 180
  }

  return false
}

// Update geocoding function to use geocoding API
async function getCoordinates(cityName) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
  
  if (!apiKey) {
    throw new Error("OpenWeather API key is not defined")
  }
  
  // Use geocoding API
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Location not found')
    }
    
    const data = await response.json()
    if (!data || data.length === 0) {
      throw new Error('Location not found')
    }
    
    const location = data[0]
    return {
      lat: location.lat,
      lon: location.lon,
      name: location.local_names?.en || location.name,
      country: location.country,
      state: location.state
    }
  } catch (error) {
    console.error("Geocoding error:", error)
    throw new Error('Location not found')
  }
}

// Update transformWeatherData to use city info from geocoding
function transformWeatherData(data, cityInfo = null) {
  return {
    coord: {
      lat: data.lat,
      lon: data.lon
    },
    weather: data.current.weather,
    main: {
      temp: data.current.temp,
      feels_like: data.current.feels_like,
      temp_min: data.daily[0].temp.min,
      temp_max: data.daily[0].temp.max,
      pressure: data.current.pressure,
      humidity: data.current.humidity
    },
    visibility: data.current.visibility,
    wind: {
      speed: data.current.wind_speed,
      deg: data.current.wind_deg
    },
    clouds: {
      all: data.current.clouds
    },
    dt: data.current.dt,
    sys: {
      type: 1,
      id: 1,
      country: cityInfo?.country || 'Unknown',
      sunrise: data.current.sunrise,
      sunset: data.current.sunset
    },
    timezone: data.timezone_offset,
    name: cityInfo?.name || data.timezone.split('/')[1]?.replace(/_/g, ' ') || 'Unknown Location',
    state: cityInfo?.state
  }
}

// Get current weather data
export async function getCurrentWeather(params = null, units = "metric") {
  if (!params) {
    return getMockWeatherData(); // Return mock data instead of null for initial state
  }

  // Check cache first
  const cached = weatherCache.get(params, "weather", units);
  if (cached) {
    return cached;
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!apiKey) {
    throw new Error("OpenWeather API key is not defined")
  }

  try {
    let coordinates
    let cityInfo = null

    if (typeof params === 'string' || params?.city) {
      // Get coordinates and city info first
      cityInfo = await getCoordinates(typeof params === 'string' ? params : params.city)
      coordinates = { lat: cityInfo.lat, lon: cityInfo.lon }
    } else if (params?.lat && params?.lon) {
      coordinates = {
        lat: parseFloat(params.lat),
        lon: parseFloat(params.lon)
      }
    }

    // Return mock data if coordinates are invalid
    if (!coordinates?.lat || !coordinates?.lon) {
      return getMockWeatherData();
    }

    // Use One Call API 3.0 with coordinates
    const url = `${BASE_URL}/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&exclude=minutely,alerts&appid=${apiKey}`

    console.log("Fetching weather from:", url)
    const response = await fetch(url)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Location not found")
      }
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()
    const transformedData = transformWeatherData(data, cityInfo)
    
    // Cache the result
    weatherCache.set(params, "weather", transformedData)
    
    return transformedData
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return getMockWeatherData(); // Return mock data on error instead of throwing
  }
}

// Get forecast data
export async function getForecast(params = null, units = "metric") {
  if (!params) {
    return getMockForecastData(); // Return mock data instead of null for initial state
  }

  // Check cache first
  const cached = weatherCache.get(params, "forecast", units);
  if (cached) {
    return cached;
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!apiKey) {
    throw new Error("OpenWeather API key is not defined")
  }

  try {
    let coordinates

    // Handle string input (city name)
    if (typeof params === 'string') {
      coordinates = await getCoordinates(params.trim())
    }
    // Handle object parameters
    else if (validateLocationParams(params)) {
      if (params.lat && params.lon) {
        coordinates = {
          lat: parseFloat(params.lat),
          lon: parseFloat(params.lon)
        }
      } else {
        coordinates = await getCoordinates(params.city)
      }
    }

    // Return mock data if coordinates are invalid
    if (!coordinates?.lat || !coordinates?.lon) {
      return getMockForecastData();
    }

    const url = `${BASE_URL}/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&exclude=current,minutely,alerts&appid=${apiKey}`

    console.log(`Fetching forecast data from: ${url}`)
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Location not found")
      }
      throw new Error(`Forecast API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Cache the result
    weatherCache.set(params, "forecast", data)
    
    return data
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    return getMockForecastData(); // Return mock data on error instead of throwing
  }
}

// Get air quality data
export async function getAirQuality(params = {}) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!apiKey) {
    throw new Error("OpenWeather API key is not defined")
  }

  if (!params.lat || !params.lon) {
    throw new Error("Coordinates are required for air quality data")
  }

  try {
    const url = `${BASE_URL}/2.5/air_pollution?lat=${params.lat}&lon=${params.lon}&appid=${apiKey}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Air quality data fetch failed')
    }
    
    return response.json()
  } catch (error) {
    console.error("Error fetching air quality data:", error)
    throw error
  }
}

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

// Group forecast data by day using daily data
export function groupForecastByDay(forecast) {
  if (!forecast?.daily) {
    return []
  }

  return forecast.daily.map(day => ({
    date: new Date(day.dt * 1000),
    high: Math.round(day.temp.max),
    low: Math.round(day.temp.min),
    condition: mapWeatherCondition(day.weather[0].main),
    precipitation: Math.round(day.pop * 100),
    moonPhase: day.moon_phase
  })).slice(0, 7)
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
      temp: 22, // Changed from 72°F to 22°C
      feels_like: 21, // Changed from 71°F to 21°C
      temp_min: 20, // Changed from 68°F to 20°C
      temp_max: 24, // Changed from 75°F to 24°C
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
      high: 22 - i, // Changed from Fahrenheit to Celsius
      low: 14 - i,  // Changed from Fahrenheit to Celsius
      condition: i === 0 ? "Clear" : i === 1 ? "Partly Cloudy" : i === 2 ? "Cloudy" : i === 3 ? "Rain" : "Showers",
      precipitation: i === 0 ? 0 : i === 1 ? 10 : i === 2 ? 30 : i === 3 ? 80 : 60,
      moonPhase: 0.25 + i * 0.03,
    })
  }

  return forecast
}

// Format temperatures for display
export function formatTemperature(temp, unit = "metric") {
  if (unit === "imperial") {
    return `${Math.round(temp)}°F`
  }
  // Convert from F to C if we receive Fahrenheit
  const celsius = (temp - 32) * 5/9
  return `${Math.round(celsius)}°C`
}


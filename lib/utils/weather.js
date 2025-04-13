export function getAirQualityLabel(aqi) {
  const labels = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor"
  }
  return labels[aqi] || "Unknown"
}

export function getWeatherIcon(code, isNight = false) {
  // OpenWeather 3.0 icon mapping
  const iconMap = {
    "01": isNight ? "clear-night" : "clear-day",
    "02": isNight ? "partly-cloudy-night" : "partly-cloudy-day",
    "03": "cloudy",
    "04": "overcast",
    "09": "rain",
    "10": isNight ? "rain-night" : "rain-day",
    "11": "thunderstorm",
    "13": "snow",
    "50": "fog"
  }
  
  const prefix = code.slice(0, 2)
  return iconMap[prefix] || "unknown"
}

export function fahrenheitToCelsius(tempF) {
  return Math.round((tempF - 32) * 5 / 9);
}

export function formatTemperature(temp, unit = "C") {
  return `${Math.round(temp)}°${unit}`;
}

export function getWindDirection(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

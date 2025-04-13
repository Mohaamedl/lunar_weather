# API Documentation

## Weather Service

The weather service utilizes OpenWeather API to fetch weather data and provides various utility functions for data transformation.

### Key Functions

#### `getCurrentWeather(params, units = "metric")`
Fetches current weather conditions for a location.

```typescript
interface Params {
  lat?: number;
  lon?: number;
  city?: string;
}
```

#### `getForecast(params, units = "metric")`
Retrieves weather forecast data.

#### `getAirQuality(params)`
Fetches air quality data for coordinates.

### Moon Phase Utilities

#### `getMoonPhase(date?: Date)`
Calculates moon phase (0-1) for given date.

#### `getMoonPhaseName(phase: number)`
Returns human-readable moon phase name.

## Data Models

### WeatherData
```typescript
interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  // ... additional fields
}
```

See [types/weather.d.ts](../types/weather.d.ts) for complete type definitions.

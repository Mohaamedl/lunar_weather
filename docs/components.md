# Components Documentation

## Core Components

### CurrentWeather
Displays current weather conditions including temperature, feels like, wind, and humidity.

```tsx
<CurrentWeather className="my-custom-class" />
```

### ForecastCard
Shows daily weather forecast with temperature, conditions, and moon phase.

```tsx
<ForecastCard
  day="Today"
  date="Mar 29"
  high={22}
  low={14}
  condition="Clear"
  moonPhase={0.25}
  precipitation={0}
/>
```

### MoonPhase
Visualizes moon phase with customizable size.

```tsx
<MoonPhase 
  phase={0.25} // 0-1
  size="lg"    // sm | md | lg | xl | 2xl | 3xl
  hemisphere="northern"
/>
```

## Layout Components

### ParticleBackground
Animated background with stars effect.

### Navbar
Main navigation with location search and settings.

### LocationProvider
Context provider for location and temperature units.

## Feature Components

### OutfitRecommendation
Provides clothing suggestions based on weather.

### MoonObservation
Shows best observation spots and upcoming events.

See individual component files for detailed props and usage examples.

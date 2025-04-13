# 🌙 Lunar Weather

A celestial weather experience with moon-themed aesthetics. Track weather conditions, moon phases, and get personalized recommendations.

## ✨ Features

- Real-time weather data with OpenWeather API integration 
- Moon phase tracking and lunar calendar
- Weather forecasts with temperature, precipitation, and wind data
- Outfit recommendations based on current conditions
- Celestial event tracking and observation guides
- Dark mode optimized UI with space-themed design
- Location-based personalization
- Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash 
git clone https://github.com/mohaamedl/lunarweather.git
cd lunarweather
```

2. Install dependencies:
```bash
pnpm install
```

3. Create .env.local file with required environment variables:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
RESEND_API_KEY=your_resend_key
```

4. Start the development server:
```bash
pnpm dev
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context
- **APIs**: OpenWeather API
- **Security**: reCAPTCHA
- **Email**: Resend
- **Deployment**: Vercel

## 📁 Project Structure

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

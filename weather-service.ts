// Weather service to fetch real-time data
export interface WeatherData {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    description: string
  }
  
  export async function fetchWeatherData(lat: number, lng: number): Promise<WeatherData> {
    // You would need to add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
  
    if (!API_KEY) {
      // Fallback to mock data if no API key
      return {
        temp: Math.round(Math.random() * (90 - 32) + 32),
        condition: "sunny",
        humidity: Math.round(Math.random() * 40 + 40),
        windSpeed: Math.round(Math.random() * 15 + 5),
        description: "Clear sky",
      }
    }
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`,
      )
  
      if (!response.ok) {
        throw new Error("Weather API request failed")
      }
  
      const data = await response.json()
  
      // Map OpenWeatherMap conditions to our simplified conditions
      const getCondition = (weatherMain: string): string => {
        switch (weatherMain.toLowerCase()) {
          case "clear":
            return "sunny"
          case "clouds":
            return "cloudy"
          case "rain":
          case "drizzle":
            return "rainy"
          case "snow":
            return "snowy"
          default:
            return "sunny"
        }
      }
  
      return {
        temp: Math.round(data.main.temp),
        condition: getCondition(data.weather[0].main),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        description: data.weather[0].description,
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      // Fallback to mock data on error
      return {
        temp: Math.round(Math.random() * (90 - 32) + 32),
        condition: "sunny",
        humidity: Math.round(Math.random() * 40 + 40),
        windSpeed: Math.round(Math.random() * 15 + 5),
        description: "Weather unavailable",
      }
    }
  }
  
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Droplets, Wind, Sun, Cloud, CloudRain, CloudSnow, RefreshCw } from "lucide-react"
import { fetchWeatherData, type WeatherData } from "./weather-service"

// 🔧 EDIT THIS DATA: Add coordinates for each team member
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Alex Hart",
    display_name: "Alex",
    location: "Washington, DC",
    timezone: "America/New_York",
    avatar: "/images/team/alex-hart.jpg",
    coordinates: { lat: 38.8951, lng: -77.0364 },
  },
  {
    id: 2,
    name: "Anders Vogt",
    display_name: "Anders",
    location: "Copenhagen, Denmark",
    timezone: "Europe/Copenhagen",
    avatar: "/images/team/anders-vogt.jpg",
    coordinates: { lat: 55.6761, lng: 12.5683 },
  },
  {
    id: 3,
    name: "Eddie Delgado",
    display_name: "Eddie",
    location: "Temecula, California, USA",  
    timezone: "America/Los_Angeles",
    avatar: "/images/team/eddie-delgado.jpg",
    coordinates: { lat: 33.5372, lng: -117.0062 },
  },
  {
    id: 4,
    name: "Ed Caggiani",
    display_name: "Ed",
    location: "Loveland, Colorado, USA",
    timezone: "America/Denver",
    avatar: "/images/team/ed-caggiani.jpg",
    coordinates: { lat: 39.2683, lng: -105.0378 },
  },
  {
    id: 5,
    name: "Frances Munoz",
    display_name: "Frances",
    location: "Colorado Springs, Colorado, USA  ",
    timezone: "America/Denver",
    avatar: "/images/team/frances-munoz.jpg",
    coordinates: { lat: 38.8339, lng: -104.8214 },
  },
  {
    id: 6,
    name: "Missy Bergen",
    display_name: "Missy",
    location: "Denver, Colorado, USA",
    timezone: "America/Denver",
    avatar: "/images/team/missy-bergen.jpg",
    coordinates: { lat: 39.7392, lng: -104.9903 },
  },
  {
    id: 7,
    name: "Jenny Jeliff-Russell",
    display_name: "Jenny",
    location: "Bangor, Maine, USA",
    timezone: "America/New_York",
    avatar: "/images/team/jenny-jeliff-russell.jpg",
    coordinates: { lat: 44.8013, lng: -68.7766 },
  },
  {
    id: 8,
    name: "Charlie Tetreault",
    display_name: "Charlie",
    location: "Denver, Colorado, USA",
    timezone: "America/Denver",
    avatar: "/images/team/charlie-tetreault.jpg",
    coordinates: { lat: 39.7392, lng: -104.9903 },
  },
  {
    id: 9,
    name: "Suba Periyasami",
    display_name: "Suba",
    location: "San Francisco, California, USA",
    timezone: "America/Los_Angeles",
    avatar: "/images/team/suba-periyasami.jpg",
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 10,
    name: "Richard Huska",
    display_name: "Richard",
    location: "Calgary, Alberta, Canada",
    timezone: "America/Edmonton",
    avatar: "/images/team/richard-huska.jpg",
    coordinates: { lat: 51.0486, lng: -114.0708 },
  },
  {
    id: 11,
    name: "Tom Hoferek",
    display_name: "Tom",
    location: "Ottawa, Ontario, Canada",
    timezone: "America/Toronto",
    avatar: "/images/team/tom-hoferek.jpg",
    coordinates: { lat: 45.4215, lng: -75.6972 },
  },
  {
    id: 12,
    name: "Sonya Badigian",
    display_name: "Sonya",
    location: "Durham, North Carolina, USA",
    timezone: "America/New_York",
    avatar: "/images/team/sonya-badigian.jpg",
    coordinates: { lat: 35.9940, lng: -78.8986 },
  },
  {
    id: 14,
    name: "Eric Lavender",
    display_name: "Eric",
    location: "Mansfield, Texas, USA",
    timezone: "America/Chicago",
    avatar: "/images/team/eric-lavender.jpg",
    coordinates: { lat: 32.5630, lng: -97.1511 },
  },
  {
    id: 15,
    name: "Lisa Rabideau",
    display_name: "Lisa",
    location: "Boston, Massachusetts, USA",
    timezone: "America/New_York",
    avatar: "/images/team/lisa-rabideau.jpg",
    coordinates: { lat: 42.3601, lng: -71.0589 },
  },
  {
    id: 16,
    name: "Bethany Holleran",
    display_name: "Bethany",
    location: "Providence, Rhode Island, USA",
    timezone: "America/New_York",
    avatar: "/images/team/bethany-holleran.jpg",
    coordinates: { lat: 41.8236, lng: -71.4222 },
  },
  {
    id: 17,
    name: "Taha Kichloo",
    display_name: "Taha",
    location: "Srinagar, Jammu and Kashmir, India",
    timezone: "Asia/Kolkata",
    avatar: "/images/team/taha-kichloo.jpg",
    coordinates: { lat: 34.0837, lng: 74.7963 },
  },
  {
    id: 18,
    name: "Taha Kichloo",
    display_name: "Taha",
    location: "Srinagar, Jammu and Kashmir, India",
    timezone: "Asia/Kolkata",
    avatar: "/images/team/taha-kichloo.jpg",
    coordinates: { lat: 34.0837, lng: 74.7963 },
  },
  {
    id: 19,
    name: "Mike Malone",
    display_name: "Mike",
    location: "Marion, Massachusetts, USA",
    timezone: "America/New_York",
    avatar: "/images/team/mike-malone.jpg",
    coordinates: { lat: 42.7011, lng: -71.5301 },
  },
  {
    id: 20,
    name: "Chris Morris",
    display_name: "Chris",
    location: "Half Moon Bay, California, USA",
    timezone: "America/Los_Angeles",
    avatar: "/images/team/chris-morris.jpg",
    coordinates: { lat: 37.4638, lng: -122.4283 },
  },
  {
    id: 21,
    name: "Eril Anthony",
    display_name: "Eril",
    location: "Bengaluru, Karnataka, India",
    timezone: "Asia/Kolkata",
    avatar: "/images/team/eril-anthony.jpg",
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 22,
    name: "Julie Kielty",
    display_name: "Julie",
    location: "Rougemont, North Carolina, USA",
    timezone: "America/New_York",
    avatar: "/images/team/julie-kielty.jpg",
    coordinates: { lat: 36.2108, lng: -79.1398 },
  },
  {
    id: 23,
    name: "Molly Morawski",
    display_name: "Molly",
    location: "Johns Island, South Carolina, USA",
    timezone: "America/New_York",
    avatar: "/images/team/molly-morawski.jpg",
    coordinates: { lat: 32.7291, lng: -80.0912 },
  },
]

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-5 w-5 text-yellow-500 weather-icon" />
    case "cloudy":
      return <Cloud className="h-5 w-5 text-gray-500 weather-icon" />
    case "rainy":
      return <CloudRain className="h-5 w-5 text-blue-500 weather-icon" />
    case "snowy":
      return <CloudSnow className="h-5 w-5 text-blue-300 weather-icon" />
    default:
      return <Sun className="h-5 w-5 text-yellow-500 weather-icon" />
  }
}

const TeamMemberCard = ({ member }: { member: (typeof TEAM_MEMBERS)[0] }) => {
  const [currentTime, setCurrentTime] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: member.timezone,
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [member.timezone])

  useEffect(() => {
    const loadWeather = async () => {
      setIsLoadingWeather(true)
      try {
        const weatherData = await fetchWeatherData(member.coordinates.lat, member.coordinates.lng)
        setWeather(weatherData)
      } catch (error) {
        console.error("Failed to load weather for", member.name, error)
      } finally {
        setIsLoadingWeather(false)
      }
    }

    loadWeather()

    // Refresh weather every 10 minutes
    const weatherInterval = setInterval(loadWeather, 10 * 60 * 1000)

    return () => clearInterval(weatherInterval)
  }, [member.coordinates.lat, member.coordinates.lng, member.name])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="h-full team-member-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 team-avatar">
            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{member.display_name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground location-info">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{member.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <span className="font-mono text-lg font-semibold text-blue-600 time-display">{currentTime}</span>
        </div>

        <div className="space-y-2 weather-section">
          {isLoadingWeather ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Loading weather...</span>
            </div>
          ) : weather ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <WeatherIcon condition={weather.condition} />
                  <span className="font-semibold temperature-display">
                    {weather.temp}°F / <span className="temperature-celsius">{(((weather.temp - 32) * 5) / 9).toFixed(1)}°C</span>
                  </span>
                </div>
                <span className="text-sm text-muted-foreground capitalize">{weather.condition}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Droplets className="h-3 w-3" />
                  <span>{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="h-3 w-3" />
                  <span>{weather.windSpeed} mph</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">Weather unavailable</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function TeamDashboardWithRealWeather() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 dashboard-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Remote Team Dashboard</h1>
          <p className="text-gray-600">Real-time overview of your distributed team across the globe</p>
          {/* <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>🌤️ Real Weather:</strong> Add your OpenWeatherMap API key as{" "}
              <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_OPENWEATHER_API_KEY</code> to enable live weather
              data.
              <br />
              <strong>💡 To customize:</strong> Edit coordinates in the{" "}
              <code className="bg-blue-100 px-1 rounded">TEAM_MEMBERS</code> array.
            </p>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Times update every second • Weather updates every 10 minutes</p>
        </div>
      </div>
    </div>
  )
}

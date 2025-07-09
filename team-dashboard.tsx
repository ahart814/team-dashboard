"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Droplets, Wind, Sun, Cloud, CloudRain, CloudSnow } from "lucide-react"

// 🔧 EDIT THIS DATA: Add/modify team members here
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 72,
      condition: "sunny",
      humidity: 45,
      windSpeed: 8,
    },
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Senior Developer",
    location: "New York, NY",
    timezone: "America/New_York",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 68,
      condition: "cloudy",
      humidity: 62,
      windSpeed: 12,
    },
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "UX Designer",
    location: "Barcelona, Spain",
    timezone: "Europe/Madrid",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 75,
      condition: "sunny",
      humidity: 38,
      windSpeed: 6,
    },
  },
  {
    id: 4,
    name: "Hiroshi Tanaka",
    role: "DevOps Engineer",
    location: "Tokyo, Japan",
    timezone: "Asia/Tokyo",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 64,
      condition: "rainy",
      humidity: 78,
      windSpeed: 15,
    },
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Data Scientist",
    location: "Mumbai, India",
    timezone: "Asia/Kolkata",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 86,
      condition: "sunny",
      humidity: 71,
      windSpeed: 9,
    },
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Marketing Lead",
    location: "London, UK",
    timezone: "Europe/London",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 59,
      condition: "cloudy",
      humidity: 68,
      windSpeed: 14,
    },
  },
  {
    id: 7,
    name: "Ana Silva",
    role: "Frontend Developer",
    location: "São Paulo, Brazil",
    timezone: "America/Sao_Paulo",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 79,
      condition: "rainy",
      humidity: 82,
      windSpeed: 11,
    },
  },
  {
    id: 8,
    name: "David Kim",
    role: "Backend Developer",
    location: "Seoul, South Korea",
    timezone: "Asia/Seoul",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 61,
      condition: "snowy",
      humidity: 55,
      windSpeed: 18,
    },
  },
  {
    id: 9,
    name: "Sophie Martin",
    role: "QA Engineer",
    location: "Paris, France",
    timezone: "Europe/Paris",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 66,
      condition: "cloudy",
      humidity: 59,
      windSpeed: 7,
    },
  },
  {
    id: 10,
    name: "Alex Thompson",
    role: "Sales Director",
    location: "Sydney, Australia",
    timezone: "Australia/Sydney",
    avatar: "/placeholder.svg?height=40&width=40",
    weather: {
      temp: 73,
      condition: "sunny",
      humidity: 43,
      windSpeed: 13,
    },
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
            <CardTitle className="text-lg truncate">{member.name}</CardTitle>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WeatherIcon condition={member.weather.condition} />
              <span className="font-semibold temperature-display">
                {member.weather.temp}°F / <span className="temperature-celsius">{(((member.weather.temp - 32) * 5) / 9).toFixed(1)}°C</span>
              </span>
            </div>
            <span className="text-sm text-muted-foreground capitalize">{member.weather.condition}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3" />
              <span>{member.weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3" />
              <span>{member.weather.windSpeed} mph</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TeamDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 dashboard-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Remote Team Dashboard</h1>
          <p className="text-gray-600">Real-time overview of your distributed team across the globe</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 To customize:</strong> Edit the <code className="bg-blue-100 px-1 rounded">TEAM_MEMBERS</code>{" "}
              array at the top of this component to add, remove, or modify team member information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Times update automatically every second • Weather data is simulated</p>
        </div>
      </div>
    </div>
  )
}

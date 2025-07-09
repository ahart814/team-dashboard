"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function OpenWeatherAPITest() {
  const [testResult, setTestResult] = useState<{
    status: "idle" | "loading" | "success" | "error"
    message: string
    data?: any
  }>({ status: "idle", message: "" })

  const testAPI = async () => {
    setTestResult({ status: "loading", message: "Testing API connection..." })

    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

    if (!API_KEY) {
      setTestResult({
        status: "error",
        message: "API key not found in environment variables",
      })
      return
    }

    try {
      // Test with San Francisco coordinates
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=37.7749&lon=-122.4194&appid=${API_KEY}&units=imperial`,
      )

      if (!response.ok) {
        const errorData = await response.json()
        setTestResult({
          status: "error",
          message: `API Error: ${errorData.message || response.statusText} (Status: ${response.status})`,
        })
        return
      }

      const data = await response.json()
      setTestResult({
        status: "success",
        message: "API key is working correctly!",
        data: {
          location: `${data.name}, ${data.sys.country}`,
          temperature: `${Math.round(data.main.temp)}°F`,
          condition: data.weather[0].description,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${Math.round(data.wind.speed)} mph`,
        },
      })
    } catch (error) {
      setTestResult({
        status: "error",
        message: `Network Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🌤️ OpenWeatherMap API Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                This will test your OpenWeatherMap API key by fetching weather data for San Francisco.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>API Key Status:</strong>{" "}
                  {process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ? (
                    <span className="text-green-600">✓ Found</span>
                  ) : (
                    <span className="text-red-600">✗ Not Found</span>
                  )}
                </p>
                {process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY && (
                  <p className="text-xs text-blue-600 mt-1 font-mono">
                    Key: {process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY.substring(0, 8)}...
                  </p>
                )}
              </div>
            </div>

            <Button onClick={testAPI} disabled={testResult.status === "loading"} className="w-full">
              {testResult.status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test API Connection
            </Button>

            {testResult.status !== "idle" && (
              <Card
                className={`border-2 ${
                  testResult.status === "success"
                    ? "border-green-200 bg-green-50"
                    : testResult.status === "error"
                      ? "border-red-200 bg-red-50"
                      : "border-blue-200 bg-blue-50"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    {testResult.status === "success" && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                    {testResult.status === "error" && <XCircle className="h-5 w-5 text-red-600 mt-0.5" />}
                    {testResult.status === "loading" && (
                      <Loader2 className="h-5 w-5 text-blue-600 mt-0.5 animate-spin" />
                    )}

                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          testResult.status === "success"
                            ? "text-green-800"
                            : testResult.status === "error"
                              ? "text-red-800"
                              : "text-blue-800"
                        }`}
                      >
                        {testResult.message}
                      </p>

                      {testResult.data && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm font-medium text-green-700">Sample Weather Data:</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <strong>Location:</strong> {testResult.data.location}
                            </div>
                            <div>
                              <strong>Temperature:</strong> {testResult.data.temperature}
                            </div>
                            <div>
                              <strong>Condition:</strong> {testResult.data.condition}
                            </div>
                            <div>
                              <strong>Humidity:</strong> {testResult.data.humidity}
                            </div>
                            <div>
                              <strong>Wind Speed:</strong> {testResult.data.windSpeed}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Common Issues:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Invalid API key (Status 401)</li>
                <li>API key not activated yet (can take a few hours)</li>
                <li>Rate limit exceeded (1000 calls/day on free tier)</li>
                <li>Network connectivity issues</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

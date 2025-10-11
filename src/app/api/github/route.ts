import { NextResponse } from "next/server"

// This is a mock implementation
// In a real app, you would use the GitHub API to fetch real data
export async function GET(request: Request) {
  try {
    // Get the username from the query parameters
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // In a real implementation, you would fetch data from GitHub API
    // For example:
    // const response = await fetch(`https://api.github.com/users/${username}`)
    // const userData = await response.json()

    // Mock data for demonstration
    const mockData = {
      totalContributions: 1247,
      totalRepositories: 32,
      totalStars: 156,
      topLanguages: [
        { name: "JavaScript", percentage: 40, color: "#f1e05a" },
        { name: "TypeScript", percentage: 30, color: "#2b7489" },
        { name: "HTML", percentage: 15, color: "#e34c26" },
        { name: "CSS", percentage: 10, color: "#563d7c" },
        { name: "Python", percentage: 5, color: "#3572A5" },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 })
  }
}

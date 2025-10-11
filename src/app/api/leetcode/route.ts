import { NextResponse } from "next/server"

// This is a mock implementation
// In a real app, you would use an unofficial LeetCode API or scrape the data
export async function GET(request: Request) {
  try {
    // Get the username from the query parameters
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // In a real implementation, you would fetch data from LeetCode
    // This could be through an unofficial API or web scraping

    // Mock data for demonstration
    const mockData = {
      totalSolved: 387,
      totalQuestions: 2500,
      easySolved: 180,
      easyTotal: 600,
      mediumSolved: 175,
      mediumTotal: 1300,
      hardSolved: 32,
      hardTotal: 600,
      ranking: 45678,
      contestRating: 1842,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error)
    return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 })
  }
}

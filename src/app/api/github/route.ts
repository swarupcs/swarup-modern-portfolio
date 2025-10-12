import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      // Add your GitHub token for higher rate limits (optional but recommended)
      // Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };

    // Fetch user data
    const userResponse = await axios.get(
      `${GITHUB_API_URL}/users/${username}`,
      { headers }
    );

    const userData = userResponse.data;

    // Fetch user repositories
    const reposResponse = await axios.get(
      `${GITHUB_API_URL}/users/${username}/repos?per_page=100&sort=updated`,
      { headers }
    );


    console.log("reposResponse", reposResponse)

    const repos = reposResponse.data;

    console.log("repos", repos)
    // Calculate total stars
    const totalStars = repos.reduce(
      (sum: number, repo: any) => sum + repo.stargazers_count,
      0
    );

    // Calculate language statistics
    const languageStats: { [key: string]: number } = {};
    
    for (const repo of repos) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    }

    // Convert to array and sort by count
    const sortedLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const totalReposWithLanguage = sortedLanguages.reduce(
      (sum, [, count]) => sum + count,
      0
    );

    // Language colors mapping (GitHub's official colors)
    const languageColors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Go: "#00ADD8",
      Rust: "#dea584",
      Ruby: "#701516",
      PHP: "#4F5D95",
      C: "#555555",
      "C++": "#f34b7d",
      "C#": "#178600",
      Swift: "#F05138",
      Kotlin: "#A97BFF",
      Dart: "#00B4AB",
      Shell: "#89e051",
      Vue: "#41b883",
      Jupyter: "#DA5B0B",
      Dockerfile: "#384d54",
    };

    const topLanguages = sortedLanguages.map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalReposWithLanguage) * 100),
      color: languageColors[name] || "#858585",
    }));

    // Note: GitHub's GraphQL API would be needed for accurate contribution count
    // For now, we'll use a placeholder or you can implement GraphQL
    const result = {
      username,
      totalContributions: 0, // Would need GraphQL API
      totalRepositories: userData.public_repos,
      totalStars,
      topLanguages,
      pullRequests: 0, // Would need GraphQL API for accurate count
    };

    console.log("GitHub API Response:", result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching GitHub stats:", error.message);
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
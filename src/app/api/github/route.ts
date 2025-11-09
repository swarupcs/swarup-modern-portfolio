/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

// GraphQL query for contributions
const contributionsQuery = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
      pullRequests {
        totalCount
      }
      issues {
        totalCount
      }
      repositories(privacy: PUBLIC) {
        totalCount
      }
    }
  }
`;

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
      // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
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

    const repos = reposResponse.data;

    // Calculate total stars
    const totalStars = repos.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sum: number, repo: any) => sum + repo.stargazers_count,
      0
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const starRepo = repos.filter((repo: any) => repo.stargazers_count > 0);

    console.log("starRepo", starRepo)

    // Calculate total forks
    const totalForks = repos.reduce(
      (sum: number, repo: any) => sum + repo.forks_count,
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

    let totalContributions = 0;
    let pullRequests = 0;
    let issues = 0;

    // Try to fetch contributions using GraphQL if token is available
    if (process.env.GITHUB_TOKEN) {
      try {
        const graphqlResponse = await axios.post(
          GITHUB_GRAPHQL_URL,
          {
            query: contributionsQuery,
            variables: { username },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        const graphqlData = graphqlResponse.data?.data?.user;
        if (graphqlData) {
          totalContributions = graphqlData.contributionsCollection.contributionCalendar.totalContributions;
          pullRequests = graphqlData.pullRequests.totalCount;
          issues = graphqlData.issues.totalCount;
        }
      } catch (graphqlError) {
        console.log("GraphQL query failed, using REST API data only");
      }
    } else {
      // Fallback: Try to scrape contribution data from the profile page
      // Note: This is a workaround and may not be as accurate
      try {
        const scrapeResponse = await axios.get(
          `https://github.com/${username}`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
          }
        );
        
        const html = scrapeResponse.data;
        const contributionMatch = html.match(/(\d+,?\d*)\s+contributions\s+in\s+the\s+last\s+year/i);
        if (contributionMatch) {
          totalContributions = parseInt(contributionMatch[1].replace(/,/g, ''));
        }
      } catch (scrapeError) {
        console.log("Scraping contributions failed");
      }
    }

    const result = {
      username,
      totalContributions,
      totalRepositories: userData.public_repos,
      totalStars,
      totalForks,
      topLanguages,
      pullRequests,
      issues,
      followers: userData.followers,
      following: userData.following,
    };

    console.log("GitHub API Response:", result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching GitHub stats:", error.message);
    console.error("Error details:", error.response?.data || error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
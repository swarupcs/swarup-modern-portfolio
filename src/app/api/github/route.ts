/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const contributionsQuery = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
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

const languageColors: { [key: string]: string } = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384d54',
};

function calculateStreaks(weeks: any[]) {
  const days = weeks
    .flatMap((w: any) => w.contributionDays)
    .sort((a: any, b: any) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let activeDays = 0;
  let tempStreak = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      activeDays++;
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const reversed = [...days].reverse();

  for (let i = 0; i < reversed.length; i++) {
    const day = reversed[i];
    if (
      i === 0 &&
      day.contributionCount === 0 &&
      (day.date === today || day.date === yesterday)
    ) {
      continue;
    }
    if (day.contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // ✅ Flatten weeks into a single array of { date, count } for the heatmap
  const contributionCalendar = days.map((d: any) => ({
    date: d.date,
    count: d.contributionCount,
  }));

  return { currentStreak, longestStreak, activeDays, contributionCalendar };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 },
    );
  }

  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    };

    // Fetch user profile
    const userResponse = await axios.get(
      `${GITHUB_API_URL}/users/${username}`,
      { headers },
    );
    const userData = userResponse.data;

    // Fetch repos
    const reposResponse = await axios.get(
      `${GITHUB_API_URL}/users/${username}/repos?per_page=100&sort=updated`,
      { headers },
    );
    const repos = reposResponse.data;

    // Stars + forks
    const totalStars = repos.reduce(
      (sum: number, repo: any) => sum + repo.stargazers_count,
      0,
    );
    const totalForks = repos.reduce(
      (sum: number, repo: any) => sum + repo.forks_count,
      0,
    );

    // Language stats
    const languageStats: { [key: string]: number } = {};
    for (const repo of repos) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    }

    const sortedLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const totalReposWithLanguage = sortedLanguages.reduce(
      (sum, [, count]) => sum + count,
      0,
    );

    const topLanguages = sortedLanguages.map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalReposWithLanguage) * 100),
      color: languageColors[name] || '#858585',
    }));

    // Defaults
    let totalContributions = 0;
    let pullRequests = 0;
    let issues = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let activeDays = 0;
    let contributionCalendar: { date: string; count: number }[] = [];

    if (process.env.GITHUB_TOKEN) {
      try {
        const graphqlResponse = await axios.post(
          GITHUB_GRAPHQL_URL,
          { query: contributionsQuery, variables: { username } },
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const graphqlData = graphqlResponse.data?.data?.user;

        if (graphqlData) {
          const calendar =
            graphqlData.contributionsCollection.contributionCalendar;
          totalContributions = calendar.totalContributions;
          pullRequests = graphqlData.pullRequests.totalCount;
          issues = graphqlData.issues.totalCount;

          // ✅ calculateStreaks now also returns contributionCalendar flat array
          const streaks = calculateStreaks(calendar.weeks);
          currentStreak = streaks.currentStreak;
          longestStreak = streaks.longestStreak;
          activeDays = streaks.activeDays;
          contributionCalendar = streaks.contributionCalendar;
        }
      } catch (graphqlError) {
        console.log('GraphQL query failed, falling back to scrape');
        try {
          const scrapeResponse = await axios.get(
            `https://github.com/${username}`,
            { headers: { 'User-Agent': 'Mozilla/5.0' } },
          );
          const html = scrapeResponse.data;
          const match = html.match(
            /(\d+,?\d*)\s+contributions\s+in\s+the\s+last\s+year/i,
          );
          if (match) totalContributions = parseInt(match[1].replace(/,/g, ''));
        } catch {
          console.log('Scraping also failed');
        }
      }
    } else {
      // No token — scrape totalContributions only
      try {
        const scrapeResponse = await axios.get(
          `https://github.com/${username}`,
          { headers: { 'User-Agent': 'Mozilla/5.0' } },
        );
        const html = scrapeResponse.data;
        const match = html.match(
          /(\d+,?\d*)\s+contributions\s+in\s+the\s+last\s+year/i,
        );
        if (match) totalContributions = parseInt(match[1].replace(/,/g, ''));
      } catch {
        console.log('Scraping contributions failed');
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
      currentStreak,
      longestStreak,
      activeDays,
      contributionCalendar, // ✅ now included — powers the heatmap
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMessage = (error as Error)?.message || 'Unknown error';
    console.error('Error fetching GitHub stats:', errorMessage);
    console.error('Error details:', (error as any).response?.data || error);

    if ((error as any).response?.status === 404) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 },
    );
  }
}

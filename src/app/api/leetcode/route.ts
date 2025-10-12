import { NextResponse } from "next/server";
import axios from "axios";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

// GraphQL query for user stats
const userStatsQuery = `
  query userProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
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
    // Send GraphQL query to LeetCode using Axios
    const response = await axios.post(
      LEETCODE_GRAPHQL_URL,
      {
        query: userStatsQuery,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
      }
    );

    const data = response.data?.data;

    // console.log("LeetCode API Response:", JSON.stringify(data, null, 2));

    if (!data?.matchedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const allCounts = data.allQuestionsCount;
    const solved = data.matchedUser.submitStatsGlobal.acSubmissionNum;
    const profile = data.matchedUser.profile;
    const userContestRanking = data.matchedUser.userContestRanking;

    // Helper to extract counts
    const getCount = (arr: any[], diff: string) =>
      arr.find((item) => item.difficulty === diff)?.count ?? 0;

    const easySolved = getCount(solved, "Easy");
    const mediumSolved = getCount(solved, "Medium");
    const hardSolved = getCount(solved, "Hard");
    const totalSolved = easySolved + mediumSolved + hardSolved;

    const result = {
      username,
      totalSolved,
      totalQuestions: getCount(allCounts, "All"),
      easyTotal: getCount(allCounts, "Easy"),
      mediumTotal: getCount(allCounts, "Medium"),
      hardTotal: getCount(allCounts, "Hard"),
      easySolved,
      mediumSolved,
      hardSolved,
      ranking: profile?.ranking ?? null,
      contestRating: userContestRanking?.rating 
        ? Math.round(userContestRanking.rating) 
        : null,
    };

    // console.log("Processed Result:", result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching LeetCode stats:", error.message);
    console.error("Error details:", error.response?.data || error);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode stats" },
      { status: 500 }
    );
  }
}
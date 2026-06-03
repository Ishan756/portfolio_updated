import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'ishancse123';

    console.log(`[LeetCode API] Fetching data for user: ${username}`);

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              userCalendar {
                activeYears
                streak
                totalActiveDays
                submissionCalendar
              }
              profile {
                reputation
              }
            }
            userContestRanking(username: $username) {
              rating
              attendedContestsCount
              globalRanking
              topPercentage
            }
            recentAcSubmissionList(username: $username, limit: 20) {
  title
}
          }
        `,
        variables: { username },
      }),
      // Add cache control to prevent stale data
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[LeetCode API] HTTP error: ${response.status}`, errorText);
      throw new Error(`LeetCode API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('[LeetCode API] GraphQL errors:', data.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const matchedUser = data?.data?.matchedUser;
    if (!matchedUser) {
      console.error('[LeetCode API] No matchedUser data found');
      throw new Error('User not found or no data available');
    }

    console.log(`[LeetCode API] Successfully fetched data for ${username}`);
    return NextResponse.json(data.data);
  } catch (error) {
    console.error('[LeetCode API] Fetch error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to fetch LeetCode data'
      },
      { status: 500 }
    );
  }
}

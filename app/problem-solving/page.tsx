  'use client';
  import { useEffect, useRef, useState } from 'react';
  import Link from 'next/link';

  type LeetStats = {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contestRating: number;
    contests: number;
    activeDays: number;
    maxStreak: number;
    currentStreak: number;
    submissionCalendar: Record<string, number>;
    topics: string[];
    recentSubmissions: Array<{
  title: string;
}>;
  };


  function buildHeatmapData(calendar: Record<string, number>) {
    const today = new Date();
    const days: { date: Date; count: number }[] = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ts = Math.floor(d.getTime() / 1000);
      // find closest key
      const key = Object.keys(calendar).find(k => Math.abs(parseInt(k) - ts) < 86400);
      days.push({ date: d, count: key ? calendar[key] : 0 });
    }
    return days;
  }

  const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  export default function ProblemSolving() {
    const [stats, setStats] = useState<LeetStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const counterRefs = useRef<Record<string, HTMLSpanElement | null>>({});

    useEffect(() => {
      async function fetchStats() {
        try {
          console.log('[Client] Fetching LeetCode data from API route...');
          const res = await fetch('/api/leetcode?username=ishancse123', {
            method: 'GET',
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error('[Client] API error:', errorData);
            throw new Error(errorData.error || `API returned ${res.status}`);
          }

          const data = await res.json();
          console.log('[Client] Received data from API:', data);

          const u = data?.matchedUser;
          const cr = data?.userContestRanking;
          const recent = data?.recentAcSubmissionList ?? [];
          
          if (!u) {
            console.error('[Client] No matchedUser data in response');
            throw new Error('No user data received from API');
          }

          const submissions = u.submitStats.acSubmissionNum;
          const total = submissions.find((s: any) => s.difficulty === 'All')?.count || 0;
          const easy = submissions.find((s: any) => s.difficulty === 'Easy')?.count || 0;
          const medium = submissions.find((s: any) => s.difficulty === 'Medium')?.count || 0;
          const hard = submissions.find((s: any) => s.difficulty === 'Hard')?.count || 0;
          const cal = JSON.parse(u.userCalendar.submissionCalendar || '{}');

          // Calculate streaks from calendar
          const todayTs = Math.floor(Date.now() / 1000);
          const dayTs = 86400;
          let maxStreak = 0, curStreak = 0, streak = 0;
          const keys = Object.keys(cal).map(Number).sort((a, b) => a - b);
          for (let i = 0; i < keys.length; i++) {
            if (i === 0 || keys[i] - keys[i-1] <= dayTs + 3600) {
              streak++;
            } else {
              streak = 1;
            }
            maxStreak = Math.max(maxStreak, streak);
          }
          // current streak
          let cs = 0;
          for (let i = keys.length - 1; i >= 0; i--) {
            const diff = todayTs - keys[i];
            if (diff < dayTs * 2) cs++;
            else break;
          }

          // Extract unique topics from recent submissions
          const topicSet = new Set<string>();
          recent.forEach((sub: any) => {
            sub.topicTags?.forEach((tag: any) => {
              topicSet.add(tag.name);
            });
          });
          const topics = Array.from(topicSet).sort();

          setStats({
            totalSolved: total,
            easySolved: easy,
            mediumSolved: medium,
            hardSolved: hard,
            contestRating: Math.round(cr?.rating || 1762),
            contests: cr?.attendedContestsCount || 9,
            activeDays: u.userCalendar.totalActiveDays,
           maxStreak: maxStreak,
currentStreak: u.userCalendar.streak || cs,
            submissionCalendar: cal,
            topics: topics.length > 0 ? topics : ['Arrays','Strings','HashMap','Linked List','Stack','Queue','Two Pointers','Sliding Window','Binary Search','Trees','Binary Search Trees','Graphs','Recursion','Backtracking','Dynamic Programming','Greedy','Heap','Bit Manipulation'],
            recentSubmissions: recent,
          });
          setError(null);
          console.log('[Client] Successfully set stats');
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          console.error('[Client] Fetch error:', errorMessage);
          setError(errorMessage);
          
          // Fallback to static data from screenshots
          setStats({
            totalSolved: 664,
            easySolved: 217,
            mediumSolved: 354,
            hardSolved: 93,
            contestRating: 1762,
            contests: 9,
            activeDays: 300,
            maxStreak: 62,
            currentStreak: 62,
            submissionCalendar: {},
            topics: ['Arrays','Strings','HashMap','Linked List','Stack','Queue','Two Pointers','Sliding Window','Binary Search','Trees','Binary Search Trees','Graphs','Recursion','Backtracking','Dynamic Programming','Greedy','Heap','Bit Manipulation'],
            recentSubmissions: [],
          });
        } finally {
          setLoading(false);
        }
      }
      fetchStats();
    }, []);

    // Counter animation
    useEffect(() => {
      if (!stats) return;
      const targets: Record<string, number> = {
        total: stats.totalSolved,
        active: stats.activeDays,
        maxStreak: stats.maxStreak,
        curStreak: stats.currentStreak,
        easy: stats.easySolved,
        medium: stats.mediumSolved,
        hard: stats.hardSolved,
        rating: stats.contestRating,
        contests: stats.contests,
      };
      Object.entries(targets).forEach(([key, target]) => {
        const el = counterRefs.current[key];
        if (!el) return;
        let start = 0;
        const duration = 1200;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          el.textContent = Math.floor(progress * target).toString();
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target.toString();
        };
        requestAnimationFrame(step);
      });
    }, [stats]);

    const heatmapDays = stats ? buildHeatmapData(stats.submissionCalendar) : [];

    // Group days by week
    const weeks: typeof heatmapDays[] = [];
    if (heatmapDays.length) {
      for (let i = 0; i < heatmapDays.length; i += 7) {
        weeks.push(heatmapDays.slice(i, i + 7));
      }
    }

    const getColor = (count: number) => {
      if (count === 0) return 'rgba(255,255,255,0.07)';
      if (count === 1) return '#4a0a0a';
      if (count <= 3) return '#6d1515';
      if (count <= 6) return '#9a2020';
      return '#e63020';
    };

    // Month labels for heatmap
    const monthPositions: { label: string; col: number }[] = [];
    if (heatmapDays.length) {
      let lastMonth = -1;
      weeks.forEach((week, wi) => {
        const month = week[0]?.date.getMonth();
        if (month !== lastMonth) {
          monthPositions.push({ label: MONTH_LABELS[month], col: wi });
          lastMonth = month;
        }
      });
    }

    return (
      <main className="dsa-page">
        <Link href="/" className="page-back">← Back home</Link>

        <div className="dsa-hero">
          <h1 className="dsa-title">DSA & Problem Solving</h1>
          <p className="dsa-sub">Evidence of consistent problem-solving practice.</p>
        </div>

        {loading ? (
          <div className="dsa-loading">Fetching LeetCode data…</div>
        ) : (
          <>
            {error && (
              <p className="dsa-error-note">
                Error fetching live data: {error}. Showing cached stats.
              </p>
            )}

            {/* Main stats */}
            <div className="dsa-stats-row">
              <div className="dsa-stat">
                <span className="dsa-stat-num dsa-stat-num--red" ref={el => { counterRefs.current['total'] = el; }}>0</span>
                <span className="dsa-stat-label">Problems Solved</span>
              </div>
              <div className="dsa-stat">
                <span className="dsa-stat-num dsa-stat-num--red" ref={el => { counterRefs.current['active'] = el; }}>0</span>
                <span className="dsa-stat-label">Active Days</span>
              </div>
              <div className="dsa-stat">
                <span className="dsa-stat-num" ref={el => { counterRefs.current['maxStreak'] = el; }}>0</span>
                <span className="dsa-stat-unit">days</span>
                <span className="dsa-stat-label">Max Streak</span>
              </div>
              <div className="dsa-stat">
                <span className="dsa-stat-num" ref={el => { counterRefs.current['curStreak'] = el; }}>0</span>
                <span className="dsa-stat-unit">days</span>
                <span className="dsa-stat-label">Current Streak</span>
              </div>
            </div>

            <div className="dsa-divider" />

            {/* Heatmap */}
            <div className="dsa-activity">
              <div className="dsa-activity-header">
                <span className="dsa-activity-label">ACTIVITY</span>
                <span className="dsa-activity-range">Last 365 days</span>
              </div>
              <div className="dsa-heatmap-wrap">
                <div className="dsa-heatmap-months">
                  {monthPositions.map((m, i) => (
                    <span key={i} style={{ gridColumnStart: m.col + 1 }}>{m.label}</span>
                  ))}
                </div>
                <div className="dsa-heatmap">
                  <div className="dsa-heatmap-days">
                    {['M','','W','','F','',''].map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div className="dsa-heatmap-grid">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="dsa-heatmap-col">
                        {week.map((day, di) => (
                          <div
                            key={di}
                            className="dsa-heatmap-cell"
                            style={{ background: getColor(day.count) }}
                            title={`${day.date.toDateString()}: ${day.count} submissions`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="dsa-heatmap-legend">
                  <span>Less</span>
                  {[0,1,3,5,8].map(c => (
                    <div key={c} className="dsa-heatmap-cell" style={{ background: getColor(c), display:'inline-block' }} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>

            <div className="dsa-divider" />

            {/* Difficulty breakdown */}
            <div className="dsa-diff-row">
              <div className="dsa-diff-stat">
                <span className="dsa-diff-num" ref={el => { counterRefs.current['easy'] = el; }}>0</span>
                <span className="dsa-diff-label">Easy</span>
              </div>
              <div className="dsa-diff-stat">
                <span className="dsa-diff-num" ref={el => { counterRefs.current['medium'] = el; }}>0</span>
                <span className="dsa-diff-label">Medium</span>
              </div>
              <div className="dsa-diff-stat">
                <span className="dsa-diff-num" ref={el => { counterRefs.current['hard'] = el; }}>0</span>
                <span className="dsa-diff-label">Hard</span>
              </div>
              <div className="dsa-diff-stat">
                <span className="dsa-diff-num dsa-diff-num--red" ref={el => { counterRefs.current['rating'] = el; }}>0</span>
                <span className="dsa-diff-label">Contest Rating</span>
              </div>
              <div className="dsa-diff-stat">
                <span className="dsa-diff-num" ref={el => { counterRefs.current['contests'] = el; }}>0</span>
                <span className="dsa-diff-label">Contests</span>
              </div>
            </div>

            <div className="dsa-divider" />

            {/* Topics */}
            {stats && (
              <div className="dsa-topics">
                <h2 className="dsa-topics-heading">TOPICS COVERED</h2>
                <div className="dsa-topics-grid">
                  {stats.topics.map(t => (
                    <span key={t} className="dsa-topic-tag">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Submissions */}
            {stats && stats.recentSubmissions.length > 0 && (
  <>
    <div className="dsa-divider" />

    <div className="dsa-recent">
      <h2 className="dsa-topics-heading">RECENT SUBMISSIONS</h2>

      <div className="dsa-recent-list">
        {stats.recentSubmissions.slice(0, 10).map((sub, idx) => (
          <div key={idx} className="dsa-recent-item">
            <span className="dsa-recent-title">
              {sub.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  </>
)}
          </>
        )}
      </main>
    );
  }

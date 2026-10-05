import type { SeasonStats } from "./player.ts";
export type ReportSection = { title: string; fact: string; interpretation: string };

export function validateStats(stats: unknown): asserts stats is SeasonStats {
  if (typeof stats !== "object" || stats === null || Array.isArray(stats)) {
    throw new Error("A report requires a statistics object.");
  }
  const values = stats as Record<string, unknown>;
  const requiredFields = {
    games: true, minutes: true, points: true, rebounds: true, assists: true,
    fieldGoalPct: true, threePointPct: true, freeThrowPct: true,
    threePointAttempts: true, turnovers: true, steals: true, blocks: true,
  } satisfies Record<keyof SeasonStats, true>;
  for (const key of Object.keys(requiredFields)) {
    const value = values[key];
    if (!Object.hasOwn(values, key) || typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      throw new Error(`Invalid statistic: ${key}`);
    }
  }
  if (!Number.isInteger(values.games) || values.games === 0) throw new Error("A report requires played games.");
  for (const key of ["fieldGoalPct", "threePointPct", "freeThrowPct"] as const) {
    if ((values[key] as number) > 100) throw new Error(`Invalid percentage: ${key}`);
  }
}

// Deterministic analysis of the supplied snapshot. No API, invented ranks, or scouting grades.
export function generateReport(stats: SeasonStats): ReportSection[] {
  validateStats(stats);
  const n = (value: number) => value.toFixed(1);
  const ratio = stats.turnovers > 0 ? (stats.assists / stats.turnovers).toFixed(2) : null;
  return [
    {
      title: "Player overview & play style",
      fact: `${n(stats.points)} points and ${n(stats.assists)} assists per game across ${stats.games} games; ${n(stats.minutes)} minutes per game.`,
      interpretation: stats.points >= 20 ? "The scoring volume suggests a substantial offensive role. These averages do not reveal off-ball movement, shot difficulty, or the team’s tactical system." : "The averages describe offensive production, but role and play style need lineup context and film.",
    },
    {
      title: "Shooting & strengths",
      fact: `${n(stats.threePointPct)}% from three on ${n(stats.threePointAttempts)} attempts per game; ${n(stats.freeThrowPct)}% at the line; ${n(stats.fieldGoalPct)}% overall.`,
      interpretation: stats.threePointPct >= 40 && stats.threePointAttempts >= 8 ? "The combination of three-point accuracy and frequent attempts suggests perimeter shooting is a central offensive strength. No league ranking is claimed without a comparison dataset." : "Accuracy and attempt volume should be considered together. League context and shot quality are needed before judging shooting strength.",
    },
    {
      title: "Playmaking & areas to review",
      fact: `${n(stats.assists)} assists and ${n(stats.turnovers)} turnovers per game.${ratio ? ` The ratio of these rounded averages is approximately ${ratio}.` : " An assist-to-turnover ratio is unavailable with zero turnovers."}`,
      interpretation: "Assists indicate recorded creation for teammates. Review turnover types and passing opportunities on film before recommending changes; box-score totals alone do not establish decision quality.",
    },
    {
      title: "Defense & rebounding",
      fact: `${n(stats.rebounds)} rebounds, ${n(stats.steals)} steals, and ${n(stats.blocks)} blocks per game.`,
      interpretation: "These numbers describe recorded events. They cannot establish on-ball defense, positioning, matchup difficulty, or overall defensive impact. Rebounding also needs role and opportunity context.",
    },
    {
      title: "Finishing, trends & comparisons",
      fact: "This snapshot includes one season’s traditional averages. It contains no rim-location splits, game-by-game series, or comparable-player dataset.",
      interpretation: "Finishing ability, improvement over time, and player comparisons remain unassessed. Add the relevant evidence before making those claims.",
    },
    {
      title: "Overall scouting summary",
      fact: `The available evidence covers ${stats.games} games from a single regular season.`,
      interpretation: "This is an initial view of scoring, shooting, and box-score contributions. Use it as a starting point for film review, not a complete talent evaluation or prediction of future performance.",
    },
  ];
}

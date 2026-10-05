export type SeasonStats = {
  games: number; minutes: number; points: number; rebounds: number; assists: number;
  fieldGoalPct: number; threePointPct: number; freeThrowPct: number;
  threePointAttempts: number; turnovers: number; steals: number; blocks: number;
};
export const player = {
  id: "stephen-curry", name: "Stephen Curry", aliases: ["steph", "steph curry", "curry"],
  team: "Golden State Warriors", position: "Guard", season: "2023–24", seasonType: "Regular season",
  source: {
    label: "NBA.com · Traditional player statistics",
    url: "https://www.nba.com/stats/players/traditional?Season=2023-24&SeasonType=Regular%20Season&PerMode=PerGame",
    checked: "2026-10-05", kind: "Manually verified historical snapshot",
  },
  stats: {
    games: 74, minutes: 32.7, points: 26.4, rebounds: 4.5, assists: 5.1,
    fieldGoalPct: 45.0, threePointPct: 40.8, freeThrowPct: 92.3,
    threePointAttempts: 11.8, turnovers: 2.8, steals: 0.7, blocks: 0.4,
  } satisfies SeasonStats,
};
export function matchesPlayer(query: string): boolean {
  const normalized = query.trim().toLocaleLowerCase().replace(/\s+/g, " ");
  return normalized.length > 0 && [player.name.toLowerCase(), ...player.aliases].some(name => name.includes(normalized));
}

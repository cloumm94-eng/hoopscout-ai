# Milestone 1 data provenance

## Included snapshot

- Player: Stephen Curry; Golden State Warriors; guard.
- Period: **2023–24 regular season**. This is historical data, not the latest season or current roster information.
- Primary source: [NBA.com traditional player statistics](https://www.nba.com/stats/players/traditional?Season=2023-24&SeasonType=Regular%20Season&PerMode=PerGame). Select Stephen Curry, season 2023–24, regular season, per-game mode.
- Manually checked: **2026-10-05**.
- Cross-check: [Basketball Reference’s Curry season table](https://www.basketball-reference.com/players/c/curryst01.html), 2023–24 row.
- No automated scraping or NBA API calls occur in this application.

| Field | Value | Unit |
| --- | ---: | --- |
| Games | 74 | Season count |
| Minutes | 32.7 | Per game |
| Points | 26.4 | Per game |
| Rebounds | 4.5 | Per game |
| Assists | 5.1 | Per game |
| Field goals | 45.0 | Percent |
| Three-pointers | 40.8 | Percent |
| Free throws | 92.3 | Percent |
| Three-point attempts | 11.8 | Per game |
| Turnovers | 2.8 | Per game |
| Steals | 0.7 | Per game |
| Blocks | 0.4 | Per game |

The assist-to-turnover ratio shown in the report is calculated from rounded per-game averages (5.1 / 2.8 ≈ 1.82), not unrounded season totals. Shooting bars encode shooting percentages only; they are not grades or league percentiles.

## Analysis limits

The report generator validates finite, nonnegative numeric inputs, percentage bounds, and a positive integer games count. Interpretations use simple documented branches: 20 points per game for scoring volume, and 40% three-point accuracy with at least eight attempts per game for the shooting-strength observation. These are prototype rules, not researched league classifications. No ranks, comparisons, projections, or scouting grades are inferred.

Traditional box-score averages cannot establish rim finishing, off-ball movement, passing quality, matchup defense, or developmental potential. A single season cannot establish a trend. Those gaps are explicitly disclosed in the report.

## Future data access

A source link establishes provenance; it does not establish a license to redistribute a larger dataset, scrape the site, or use its imagery. This prototype is not a live integration or a claim of NBA permission. Before expanding to bulk/live data or launching commercially, select a provider whose terms expressly cover the intended display, caching, redistribution, and report use. Do not reuse NBA photography, logos, video, or site design without permission.

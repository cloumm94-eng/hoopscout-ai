# HoopScout AI

A focused basketball scouting prototype built with Next.js, TypeScript, and Tailwind CSS.

## Milestone 1

Search Stephen Curry → inspect his profile and historical season statistics → generate a transparent scouting report. The first release includes one manually verified 2023–24 regular-season snapshot. All displayed team information refers to that season.

The report is **rule-based, not AI-generated**. It runs locally from the supplied statistics, separates facts from interpretation, and explicitly leaves finishing, defensive quality, trends, and comparisons unassessed when evidence is missing. No database, account, API key, paid service, or live data feed is needed.

## Open it on your iPad

1. Open this repository in Safari, then open your existing GitHub Codespace.
2. In its terminal, run `git pull --ff-only` to get the latest code on `main`.
3. Run `npm ci` once to install the exact dependencies.
4. Run `npm run dev`.
5. In the **Ports** panel, find port **3000**, then tap **Open in Browser** (the globe icon). Keep the port private.
6. If Codespaces asks to rebuild the development container, accept it; it provides Node.js 22. Node.js 22.13 or newer is required for the project’s test command.

You can also start a new Codespace from the repository’s **Code → Codespaces → Create codespace on main** menu. Dependency installation runs automatically when this project’s container is created; then run `npm run dev`.

Codespaces usage is subject to your GitHub account’s included quota. This milestone requires no paid AI service. Hosting is a later step.

## Try the complete flow

- Confirm Curry’s profile loads with **2023–24**, **74 games**, and an explicit historical-data label.
- Search `Steph` or `Curry`: the player remains available. Search `LeBron`: an honest empty state appears. Tap **View Stephen Curry** to return.
- Submit an empty search: the page asks for a name.
- Inspect the points, rebounds, assists, minutes, and shooting percentages.
- Tap **Generate scout report**. Six report sections appear below the button, with **Data fact** and **Interpretation** labels. The page scrolls to the report and keyboard focus moves to it.
- Use **View NBA.com source** to review the data’s provenance.
- Repeat on a narrow phone view and an iPad view; no horizontal scrolling should be required.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run check
```

`check` runs report/search unit tests, TypeScript checks, and the production build. GitHub Actions runs the same checks on pushes and pull requests. `npm run start` serves the production build after `npm run build`.

## Data and product boundaries

The snapshot is in `lib/player.ts`; the report rules are in `lib/report.ts`. See [DATA.md](DATA.md) for source, definitions, and limitations. The product uses original typography, monograms, and court graphics rather than player photos or team logos. It is independent of the NBA and its teams.

Next milestones should first validate this experience with a real user, then select an appropriately licensed data provider and add more players. Live data, a real AI model, Scout Me, saved reports, comparisons, and payments are not part of Milestone 1.

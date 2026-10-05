"use client";

import { useEffect, useRef, useState } from "react";
import { matchesPlayer, player } from "@/lib/player";
import { generateReport, type ReportSection } from "@/lib/report";

type IconName = "search" | "arrow" | "spark" | "grid" | "document" | "check";
function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
    arrow: <><path d="M4 12h15M13 6l6 6-6 6"/></>,
    spark: <><path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6Z"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    document: <><path d="M14 3H5v18h14V8Z"/><path d="M14 3v5h5M8 12h8M8 16h6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
function Court() {
  return <svg className="court" viewBox="0 0 450 280" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5"><path d="M15 15h420v250H15zM225 15v250"/><circle cx="225" cy="140" r="37"/><path d="M15 90h72v100H15m420-100h-72v100h72M87 90a50 50 0 0 1 0 100M363 90a50 50 0 0 0 0 100M15 35h15a110 110 0 0 1 0 210H15m420-210h-15a110 110 0 0 0 0 210h15"/><circle cx="38" cy="140" r="8"/><circle cx="412" cy="140" r="8"/></g></svg>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(true);
  const [report, setReport] = useState<ReportSection[] | null>(null);
  const [error, setError] = useState("");
  const reportRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (report) {
      reportRef.current?.focus({ preventScroll: true });
      reportRef.current?.scrollIntoView({ block: "start" });
    }
  }, [report]);
  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearched(true);
    setFound(matchesPlayer(query));
    setReport(null);
    setError("");
  }
  function createReport() {
    try { setReport(generateReport(player.stats)); setError(""); }
    catch { setError("The statistics could not be validated. Please reload and try again."); }
  }
  const stats = player.stats;
  return <div className="app-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="HoopScout AI home"><span className="brand-mark"><Icon name="spark"/></span><span>HoopScout<span className="brand-ai"> AI</span></span></a>
      <p className="nav-label">SCOUTING WORKSPACE</p>
      <nav aria-label="Main navigation"><a className="nav-item active" href="#players"><Icon name="grid"/>Player explorer<span className="nav-dot"/></a><a className="nav-item" href="#report"><Icon name="document"/>Scouting report</a></nav>
      <div className="sidebar-note"><span className="tiny-badge">MILESTONE 01</span><h3>One player.<br/>A clearer picture.</h3><p>A focused first step in understanding the game through data.</p><span className="status-dot"/> Free prototype</div>
      <div className="sidebar-bottom">BASKETBALL, UNDERSTOOD.</div>
    </aside>
    <div className="workspace">
      <header className="topbar"><span>Workspace <span className="breadcrumb">/ Player explorer</span></span><span className="prototype"><span className="status-dot"/>Early access · M1</span></header>
      <main id="main">
        <section id="players" className="intro"><div><p className="eyebrow">THE GAME BEHIND THE NUMBERS</p><h1>Player explorer<span>.</span></h1><p className="lede">Start with the stats. Discover the story.</p></div><div className="snapshot-tag"><span className="status-dot"/>Historical season snapshot</div></section>
        <form className="search-form" onSubmit={search} role="search"><Icon name="search"/><label className="sr-only" htmlFor="player-search">Search available player</label><input id="player-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Stephen Curry or Steph…" autoComplete="off" maxLength={100}/><button type="submit">Search <Icon name="arrow"/></button></form>
        <p className="search-hint">First release: Stephen Curry is the only available player.</p>
        <div aria-live="polite" className="sr-only">{searched && (found ? "Stephen Curry found. Player profile below." : "No matching player. Only Stephen Curry is available in this milestone.")}</div>
        {!found ? <section className="empty-state"><Icon name="search"/><h2>{query.trim() ? "No matching player yet" : "Enter a player name"}</h2><p>This milestone includes Stephen Curry only. Try “Curry” to explore his profile.</p><button className="primary-button" onClick={() => {setQuery("Stephen Curry");setFound(true);setSearched(true);}}>View Stephen Curry <Icon name="arrow"/></button></section> : <>
          <section className="player-card" aria-labelledby="player-name"><div className="player-content"><p className="eyebrow">FEATURED PLAYER <span className="divider">/</span> {player.season}</p><div className="player-heading"><div className="monogram" aria-hidden="true">SC</div><div><h2 id="player-name">Stephen Curry</h2><p>{player.team}<span className="divider">·</span>{player.position}</p></div></div><div className="player-tags"><span>Regular season</span><span>{stats.games} games played</span><span>Historical data</span></div><p className="player-description">Explore the season. Build a grounded scouting report.</p></div><div className="player-art"><Court/><span className="art-caption">A SEASON IN FOCUS</span><span className="art-initials">SC<span>2023 / 24</span></span></div></section>
          <section className="stats-section" aria-labelledby="stats-heading"><div className="section-heading"><h2 id="stats-heading">Season at a glance</h2><span>{player.season} <span className="divider">·</span> Per game unless noted</span></div><div className="stat-grid">{[{label:"Points",value:stats.points,note:"PTS / GAME"},{label:"Rebounds",value:stats.rebounds,note:"REB / GAME"},{label:"Assists",value:stats.assists,note:"AST / GAME"},{label:"Minutes",value:stats.minutes,note:"MIN / GAME"}].map((stat,index)=><article className={`stat-card ${index===0?"highlight":""}`} key={stat.label}><span className="stat-label">{stat.label}</span><strong>{stat.value.toFixed(1)}</strong><span className="stat-note">{stat.note}</span></article>)}</div></section>
          <div className="detail-grid"><section className="shooting-panel" aria-labelledby="shooting-heading"><div className="section-heading"><h2 id="shooting-heading">Shooting efficiency</h2><span>SEASON %</span></div>{[{label:"Field goals",short:"FG",value:stats.fieldGoalPct},{label:"Three-pointers",short:"3PT",value:stats.threePointPct},{label:"Free throws",short:"FT",value:stats.freeThrowPct}].map(stat=><div className="shooting-row" key={stat.short}><div><span>{stat.label}</span><strong>{stat.value.toFixed(1)}<small>%</small></strong></div><div className="meter" aria-hidden="true"><span style={{width:`${stat.value}%`}}/></div></div>)}<p className="panel-footnote">{stats.threePointAttempts.toFixed(1)} three-point attempts per game. Bars show accuracy, not player rankings.</p></section>
          <section className="report-callout" id="report" aria-labelledby="report-heading"><span className="report-symbol"><Icon name="spark"/></span><p className="eyebrow">FROM NUMBERS TO UNDERSTANDING</p><h2 id="report-heading">See beyond<br/>the box score.</h2><p>Turn this season’s statistics into a clear scouting report, with the evidence behind every observation.</p><button className="primary-button" onClick={createReport} aria-controls="generated-report">{report?"Regenerate scout report":"Generate scout report"}<Icon name="arrow"/></button><span className="report-disclosure">Rule-based preview · No AI model connected</span>{error && <p role="alert" className="error">{error}</p>}</section></div>
          {report && <section className="generated-report" id="generated-report" ref={reportRef} tabIndex={-1} aria-labelledby="generated-heading"><div className="section-heading"><div><p className="eyebrow">SCOUTING REPORT / {player.season}</p><h2 id="generated-heading">Stephen Curry · Season analysis</h2></div><span className="report-ready"><Icon name="check"/>Report ready</span></div><p className="report-method">Generated locally from the displayed historical snapshot using fixed rules. Facts are sourced; interpretations are cautious observations. This is not AI-generated or a film-based evaluation.</p><div className="report-sections">{report.map((section,index)=><article key={section.title}><span className="section-number">0{index+1}</span><div><h3>{section.title}</h3><p className="fact"><span>DATA FACT</span>{section.fact}</p><p className="interpretation"><span>INTERPRETATION</span>{section.interpretation}</p></div></article>)}</div><a className="text-link" href="#sources">Review the data source <Icon name="arrow"/></a></section>}
          <section className="source-panel" id="sources"><div className="source-check"><Icon name="check"/></div><div><h2>Know where the numbers come from.</h2><p>{player.source.kind}. {player.season} regular season; checked {player.source.checked}. Not live statistics.</p><a className="text-link" href={player.source.url} target="_blank" rel="noopener noreferrer">View NBA.com source <Icon name="arrow"/><span className="sr-only"> (opens in a new tab)</span></a></div></section>
        </>}
        <footer><span>© {new Date().getFullYear()} HoopScout AI</span><p>Independent basketball analysis. Not affiliated with the NBA or its teams.</p><a href="#players">Back to top ↑</a></footer>
      </main>
    </div>
  </div>;
}

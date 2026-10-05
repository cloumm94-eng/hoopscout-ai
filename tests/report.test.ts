import test from "node:test";
import assert from "node:assert/strict";
import { player, matchesPlayer } from "../lib/player.ts";
import { generateReport, validateStats } from "../lib/report.ts";

test("search recognizes name, aliases, case, and whitespace without matching an empty query", () => {
  for (const query of ["Stephen Curry", " CURRY ", "steph", "Steph   Curry"]) assert.equal(matchesPlayer(query), true);
  for (const query of ["", "   ", "LeBron", "<script>"]) assert.equal(matchesPlayer(query), false);
});
test("report separates facts and interpretation and discloses missing evidence", () => {
  const report = generateReport(player.stats);
  assert.equal(report.length, 6);
  for (const section of report) { assert.ok(section.fact); assert.ok(section.interpretation); }
  assert.match(report[0].fact, /26\.4 points/);
  assert.match(report[1].fact, /40\.8%.*11\.8/);
  assert.match(report[2].fact, /approximately 1\.82/);
  assert.match(report[4].interpretation, /remain unassessed/);
  assert.deepEqual(generateReport(player.stats), report);
});
test("changing input statistics changes report evidence and conditional shooting analysis", () => {
  const report = generateReport({...player.stats, points: 12, threePointPct: 31, threePointAttempts: 2});
  assert.match(report[0].fact, /12\.0 points/);
  assert.doesNotMatch(report[0].fact, /26\.4/);
  assert.doesNotMatch(report[1].interpretation, /central offensive strength/);
});
test("invalid and missing numeric evidence fail validation rather than producing fabricated output", () => {
  for (const patch of [{points: NaN}, {assists: Infinity}, {rebounds: -1}, {threePointPct: 101}, {games: 0}, {games: 2.5}]) {
    assert.throws(() => generateReport({...player.stats, ...patch}));
  }
});
test("zero turnovers does not produce Infinity or a made-up ratio", () => {
  const report = generateReport({...player.stats, turnovers: 0});
  assert.match(report[2].fact, /ratio is unavailable/);
  assert.doesNotMatch(report[2].fact, /Infinity|NaN/);
});

test("every required statistic must be present and numeric before report formatting", () => {
  for (const key of Object.keys(player.stats)) {
    const incomplete: Record<string, unknown> = {...player.stats};
    delete incomplete[key];
    assert.throws(() => validateStats(incomplete), {message: `Invalid statistic: ${key}`});
    for (const value of [undefined, null, "0", NaN, Infinity, -1]) {
      assert.throws(() => validateStats({...player.stats, [key]: value}), {message: `Invalid statistic: ${key}`});
    }
  }
});

test("malformed statistics containers are rejected explicitly", () => {
  for (const value of [null, undefined, [], "stats", 42]) {
    assert.throws(() => validateStats(value), {message: "A report requires a statistics object."});
  }
  assert.throws(() => validateStats(Object.create(player.stats)), /Invalid statistic/);
});

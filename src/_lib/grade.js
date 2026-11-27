// Word for a BeVerified score. The only place the scale lives: templates use
// the `grade` filter and the rescore scripts import it, so a record never
// stores its own grade (owner, 2026-11-27).
export const GRADE_SCALE = [
  [4.5, "Excellent"],
  [4.0, "Great"],
  [3.5, "Very Good"],
  [3.0, "Good"],
  [0, "Fair"],
];

// Scores still on the old v3.0 method sit on a higher scale (reports/rescore-v3.1.md),
// so they get no word until they are re-scored: pass the record's methodology.
export const LEGACY_METHODS = ["v3.0"];

export function grade(score, methodology) {
  if (methodology && LEGACY_METHODS.includes(methodology)) return "";
  if (score == null || score === "" || Number.isNaN(Number(score))) return "";
  const s = Math.round(Number(score) * 10) / 10;
  return GRADE_SCALE.find(([min]) => s >= min)[1];
}

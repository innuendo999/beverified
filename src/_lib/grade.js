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

export function grade(score) {
  if (score == null || score === "" || Number.isNaN(Number(score))) return "";
  const s = Math.round(Number(score) * 10) / 10;
  return GRADE_SCALE.find(([min]) => s >= min)[1];
}

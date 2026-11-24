// Footer decoration (owner chose variant B "security paper", 2026-11-24): guilloche rosette and a
// microprint line, written once as static SVGs so the footer HTML stays small and the files cache.
// Run: node scripts/footer-art.mjs  → src/assets/img/footer-rosette.svg, src/assets/img/footer-microprint.svg
import { writeFileSync } from "node:fs";

const rings = [];
for (let k = 0; k < 22; k++) {
  const R = 120 + k * 11, A = 9 + (k % 4) * 2, N = 30, ph = k * 0.35;
  let d = "";
  for (let i = 0; i < 300; i++) {
    const t = (i / 300) * Math.PI * 2;
    const r = R + A * Math.sin(N * t + ph) + 4 * Math.sin(3 * t - ph);
    d += (i ? "L" : "M") + Math.round(r * Math.cos(t)) + " " + Math.round(r * Math.sin(t));
  }
  const strong = k % 4 === 0;
  rings.push(`<path d="${d}Z" stroke-opacity="${strong ? 0.3 : 0.12}"/>`);
}
const rosette = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="760" viewBox="-380 -380 760 760"><g fill="none" stroke="#7E9BF0" stroke-width="1">${rings.join("")}</g></svg>\n`;
writeFileSync("src/assets/img/footer-rosette.svg", rosette);

const phrase = "BEVERIFIED INDEPENDENT REVIEWS KYC KYB AML · ";
const micro = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="8" viewBox="0 0 600 8"><text x="0" y="6" fill="#3A4D78" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="5.5" letter-spacing="0.44" textLength="600" lengthAdjust="spacingAndGlyphs">${phrase.repeat(4).replace("·", "&#183;").replaceAll("·", "&#183;")}</text></svg>\n`;
writeFileSync("src/assets/img/footer-microprint.svg", micro);
console.log("rosette", rosette.length, "bytes; microprint", micro.length, "bytes");

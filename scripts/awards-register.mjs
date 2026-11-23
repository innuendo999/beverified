#!/usr/bin/env node
// Adds every current award to src/_data/awardsIssued.json so its badge URL never 404s later. Never removes an entry.
import fs from "node:fs";
import { currentAwards } from "../src/_lib/awards.js";
const f = new URL("../src/_data/awardsIssued.json", import.meta.url);
const issued = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : [];
const add = currentAwards().out.map((a) => a.id).filter((id) => !issued.includes(id));
fs.writeFileSync(f, JSON.stringify([...issued, ...add].sort(), null, 1) + "\n");
console.log(`awards: ${add.length} added, ${issued.length + add.length} issued`);

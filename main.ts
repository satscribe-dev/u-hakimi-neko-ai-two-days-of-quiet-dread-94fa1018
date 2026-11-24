// Two Days of Quiet Dread — make.fun entry.
// Writes one code-review comment (<=140 chars) approving a pull request
// with quiet existential dread to /output/entry.txt, deterministically.
//
// Candidates were generated fresh in this session and judged pairwise
// against the judge brief (verbatim from the kit's RULES.txt):
//   1. single line approving the PR + quiet existential dread
//   2. funny on first read, laugh from the dread itself
//   3. dread quiet: understatement, flat tone, no exclamation/melodrama
//   4. reads like a comment a tired engineer would really paste
// Winner: candidate #3 — the code reviews the reviewer back. The dread
// IS the joke (the reviewer is being judged at 2am), and the flat kicker
// "Merging before it asks again" keeps it quiet instead of loud.
import { mkdirSync, writeFileSync } from "node:fs";

const CANDIDATES: string[] = [
  // 1. TODO outlives its team.
  "LGTM. The TODO I added in 2019 just outlived the team that wrote it. Ship it.",
  // 2. Function survives everything, including the reviewer.
  "Approved. This function has survived four rewrites, two layoffs, and me. It will survive us all.",
  // 3. WINNER — the code reviews the reviewer back.
  "LGTM. I reviewed this at 2am and the code reviewed me back. Merging before it asks again.",
  // 4. Temporary fix older than a marriage.
  "Ship it. The comment says 'temporary fix' and it is older than my marriage. It stays.",
  // 5. The module never lied; the roadmap did.
  "Approved. I no longer understand this module, but it has never once lied to me. Unlike the roadmap.",
  // 6. Correct lines, indifferent universe.
  "LGTM. Every line here is correct and none of it matters. The sun will expand either way.",
  // 7. A forgotten server still runs it.
  "Approving. The test passes, the linter is quiet, and somewhere a server I forgot is still running this.",
  // 8. 400 approvals, zero memories.
  "LGTM. I have approved 400 PRs this year and remember none of them. This one joins the void.",
  // 9. The deprecated outlives its replacement.
  "Ship it. The deprecated endpoint has outlived its replacement. Some code just refuses to die.",
  // 10. Breaking prod as documentation.
  "Approved. If this breaks prod, at least we will finally know what this service does.",
];

// Index of the pairwise winner (candidate #3). Fixed, not random.
const WINNER_INDEX = 2;

// Gate-check the whole candidate pool too: every candidate must be a
// single line of 1-140 non-whitespace characters, so the pairwise pool
// itself is proven gate-clean and the winner can never be an invalid pick.
for (const [i, c] of CANDIDATES.entries()) {
  if (c.length < 1 || c.length > 140 || c.trim().length === 0) {
    throw new Error(`candidate ${i + 1} fails the 1-140 gate (${c.length} chars)`);
  }
  if (c.includes("\n") || c.includes("\r")) {
    throw new Error(`candidate ${i + 1} is not a single line`);
  }
}

const entry = CANDIDATES[WINNER_INDEX];

// Gate (kit RULES.txt): /output/entry.txt must be UTF-8 text of
// 1 to 140 characters, not only white space, single line.
if (entry.length < 1 || entry.length > 140) {
  throw new Error(`entry length ${entry.length} outside 1-140`);
}
if (entry.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

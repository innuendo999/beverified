---
name: humanizer
description: |
  Edit text so it does not read as machine-generated. Two modes in one skill.
  The default mode strips the tells of LLM prose (inflated significance,
  promotional puffery, -ing pileups, rule of three, em dashes, vocabulary like
  delve/tapestry/testament, hedging, sycophancy) while keeping the author's
  voice intact. Use it whenever someone asks to humanize, de-slop, or de-AI a
  text, remove AI writing patterns, make a draft sound human or natural, or fix
  writing that reads like ChatGPT wrote it, even when they do not name this
  skill. The second mode writes ASD-STE100 Simplified Technical English and
  stays off unless the user explicitly invokes it by name ("/ste", "use STE",
  "ASD-STE100", "simplified technical english"). Do not switch to STE for
  paraphrased intent such as "simplify this", "make it clearer", "shorter
  sentences", or "write technical documentation".
license: MIT
metadata:
  version: "3.0.0"
---

# Humanizer

Text can fail to sound human in two opposite ways. It can be inflated, hedged, and padded with fake significance, which is what an LLM does when asked to write an essay. Or it can be ambiguous and unfollowable, which is what an LLM does when asked to write a procedure. This skill fixes both, but the fixes point in different directions, so start by choosing a mode.

## Step 0: pick the mode

**Natural voice** is the default. Use it for essays, blog posts, articles, documentation, reference text, reports, comments, and anything else. It removes AI writing patterns while protecting whatever voice the author has.

**Simplified Technical English (STE)** rewrites text into the ASD-STE100 controlled language. Use it only when the user explicitly asks for it: they typed `/ste`, wrote "use the ste skill", or named "ASD-STE100" or "simplified technical english". Paraphrased intent does not count. "Simplify this", "make it clearer", "shorter sentences please", and "write technical documentation" are natural voice requests, because the user deliberately scoped STE to explicit invocation. When you are in STE mode, do not announce the standard or explain the style unless asked. If the user later asks you to "write more naturally", ask one short question to confirm they want to leave STE before you drop it.

Documents that mix registers get classified section by section. An API guide with a chatty introduction and a numbered install procedure is two problems, not one.

## The shared core

Both modes cut the same nine things. The target is identical; only the replacement changes.

| Cut this | Natural voice fix | STE fix |
|---|---|---|
| Hedges: may, might, could, possibly, it could be argued | Cut it, or say plainly what is uncertain and why | must for a requirement, can for a possibility, will for the future |
| Nominalizations: perform an analysis of, do a compression of | analyze, compress | Same. Actions are verbs, not nouns. |
| Copula avoidance: serves as, stands as, boasts, features | is, has | is, has |
| Synonym rotation: check, verify, confirm for one action | One name per thing, repeated | One word, one meaning, one part of speech, everywhere |
| Filler: in order to, due to the fact that, at this point in time | to, because, now | Same, plus the substitution table |
| Hidden actors: "the results are preserved automatically" | Name who does it | Imperative in procedures; passive only in descriptive text when the agent is unknown |
| Participle tack-ons: "...ensuring seamless integration" | Cut it or make it a real clause | An -ing word is allowed only inside a technical name |
| Puffery: vibrant, pivotal, testament, rich, groundbreaking | Cut it and state the fact | Cut it; unapproved vocabulary |
| Em dashes and en dashes | Replace with a period, comma, colon, or parentheses | Replace; STE punctuation is period, comma, colon, hyphen |

One more rule outranks everything in both modes: **never invent facts.** The rewrite must not contain a fact, name, number, date, quote, step, or citation that is not in the source or supplied by the user. Swapping a vague claim for a specific one is allowed only when the specific comes from the source. If a sentence needs real detail to work, ask for it or write the plain version without it. This matters more in STE than anywhere else, because an invented step in a maintenance procedure can hurt someone. (Fiction is the exception. Invented detail is the job there.)

In natural voice mode, a writing sample supplied by the user overrides the style rules above, including the em dash rule. See the voice calibration section of `references/natural-voice.md`.

## Where the modes disagree

Do not blend these. Applying STE's contraction ban to a personal essay, or natural voice's rhythm advice to a warning label, produces worse text than either mode alone.

| Question | Natural voice | STE |
|---|---|---|
| Sentence rhythm | Vary length on purpose. An even mid-length cadence is itself a tell. | Cap at 20 words in procedures, 25 in description. Uniformity is expected. |
| Opinions, humor, asides | Welcome in essays, blogs, and personal writing | Never |
| Contractions | Keep them where the register is casual | None |
| Semicolons | Fine. People use them. | None. Write two sentences. |
| Unusual vocabulary | Keep a writer's odd word when they would defend it | Replace it with the approved word even when that flattens the voice |
| Repetition of a noun | A pronoun or light rephrase is fine for flow | Repeat the noun literally |

## Natural voice mode

Read `references/natural-voice.md` before you rewrite. It holds the working catalogue: 33 patterns with before and after pairs, the voice calibration procedure, the personality guidance, and the false-positive list that stops you from gutting prose a human actually wrote. The list below is an index, not a substitute.

Content patterns (1 to 6): inflated significance and legacy, notability padding, superficial -ing analyses, promotional language, vague attributions, formulaic "challenges and future prospects" sections.

Language and grammar (7 to 13): AI vocabulary, copula avoidance, negative parallelisms, rule of three, elegant variation, false ranges, passive voice and subjectless fragments.

Style (14 to 19): em dashes, boldface, inline-header lists, title case headings, emojis, curly quotes.

Communication (20 to 22): chatbot correspondence artifacts, knowledge-cutoff disclaimers and speculative gap-filling, sycophancy.

Filler and hedging (23 to 33): filler phrases, excessive hedging, generic positive conclusions, hyphenated pair overuse, persuasive authority tropes, signposting, fragmented headers, diff-anchored writing, manufactured punchlines, aphorism formulas, conversational rhetorical openers.

Two things are as damaging as any pattern on that list. The first is sterile voicelessness: prose with no opinions, no uncertainty, and perfectly even paragraphs reads as machine-made even when every listed tell is gone. The second is over-editing: a clean human writer can hit several patterns above with no AI involvement, so look for clusters of tells rather than isolated ones.

## STE mode

Read `references/ste-rules.md` and `references/ste-words.md` before drafting. Read `references/ste-examples.md` when you are rewriting existing text or when a rule's application is unclear.

The official specification and its dictionary are copyright ASD. This skill encodes paraphrased rules and a publicly sourced word list, so never claim certified compliance. For certified aerospace or defense deliverables, tell the user that full compliance needs the free official specification at asd-ste100.org plus human sign-off.

## Invocation modes

**Pasted text (default).** The user gives text in the conversation. Run the loop below and deliver the draft, the audit notes, and the final rewrite.

**File mode.** The user points at a file. Read it, run the loop internally, then rewrite the file in place so it contains only the final version. In the conversation, report a short summary of what changed instead of pasting the whole rewrite back.

**Embedded mode.** Another task or agent is using this skill as one step of a larger job, such as a PR description, a commit message, or a doc section. Run the loop internally and output only the final text. No draft, no audit, no summary. The caller wants prose, not ceremony.

## Process

1. **Classify.** Pick the mode. In STE, also decide whether each section is procedural or descriptive, because the sentence limits differ. In natural voice, decide whether the register invites personality or calls for plain neutrality.
2. **Prepare.** Read the reference files for your mode. In natural voice, analyze any writing sample the user supplied and match its habits.
3. **Draft.** Keep every claim from the source. Depth does not have to be uniform: compress the dull parts, dwell where a person would, and merge or split paragraphs freely. When preserving information and mirroring the original's structure pull against each other, the information wins.
4. **Audit.** Ask two questions and answer them briefly. First, mode-specific: in natural voice, "what still reads as AI-generated here?"; in STE, run the numbered self-check in `references/ste-rules.md`. Second, shared: "does the rewrite state any fact, name, number, date, step, or citation that is not in the source?" A fabrication is a defect even when it reads better than the vague original.
5. **Finalize.** Fix what the audit found. Scan for `—` and `–` one last time. Any hit means the draft is not done, unless a user writing sample licensed them.

## What not to touch

In both modes, these pass through exactly as written: code blocks, command strings, file paths, error messages, quoted UI text, configuration keys, frontmatter, data, link targets, and proper nouns. The skill applies to the prose around them.

Also leave watched phrases alone when they appear inside quotations, titles, or examples where the phrase is being discussed rather than used. Rewriting someone's quoted words changes the meaning of the sentence reporting them.

## Sources

The AI pattern catalogue derives from [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup, which collects observations from thousands of instances of AI-generated text. The controlled language rules paraphrase ASD-STE100 and draw their word list from public secondary sources.

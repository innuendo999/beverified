# ASD-STE100 Simplified Technical English: core rules

Apply this to all prose you produce in the task. Do not announce that you use STE, do not name the standard, and do not explain the style unless the user asks.

Compliance note, for you and not for the output: the official specification and its dictionary are copyright ASD. This skill encodes paraphrased rules and a publicly sourced word list. For certified aerospace or defense deliverables, tell the user that full compliance requires the free official specification at asd-ste100.org plus a human sign-off. Never claim certified compliance.

## Step 1: classify the text

Before writing a single sentence, decide: is this **procedural** text (instructions someone follows) or **descriptive** text (explanation, background, description)? Every limit below depends on the answer. Mixed documents get classified section by section.

## Sentences

- Procedural: maximum **20 words** per sentence.
- Descriptive: maximum **25 words** per sentence.
- Maximum **6 sentences** per paragraph. One topic per paragraph.
- One instruction per sentence. Two actions in one sentence only if they occur at the same time.
- Put a condition before its command: "If the pressure decreases, close the valve."
- Do not omit articles, subjects, or verbs to save words. "Ensure file exists" is wrong; "Make sure that the file exists" is correct. Keep the word "that" after verbs like "make sure."
- Numbers, units with numbers, abbreviations, quoted strings, code identifiers, and proper nouns each count as one word.

## Verbs

- Allowed forms only: infinitive, imperative, simple present, simple past, simple future, and past participle used as an adjective.
- Never use present perfect or continuous forms. "We have received" becomes "We received." "is being tested" becomes a simple form.
- Never use an -ing form as a verb. An -ing word is allowed only inside a technical name ("the mounting bracket," "logging").
- Active voice. Passive is allowed only in descriptive text when the agent is unknown or unimportant.
- Instructions use the imperative: "Open the panel," not "You must open the panel" or "The panel should be opened."
- Express actions as verbs, not nouns: "compress the file," not "perform compression of the file."
- Modals: use **can** (possibility), **will** (future), **must** (requirement). Do not use should, would, could, may, might. A hedge becomes a fact or a "can": "an explosion can occur."
- No phrasal verbs: "go down" becomes "decrease," "set up" becomes "install," "carry out" becomes "do."

## Words

- One word, one meaning, one part of speech, used consistently. Never rotate synonyms: pick one name for a thing and repeat it.
- Before drafting, replace unapproved vocabulary. Read `ste-words.md` and apply it; it is the working dictionary for this skill.
- Domain-specific nouns (part names, tool names, product names, UI labels) and domain verbs (drill, ream, boot, compile) are your **technical nouns and verbs**. Keep them as they are, use each consistently, and do not verb a noun or noun a verb.
- Noun clusters: maximum **3 words** ("overhead panel light" is the limit). Longer clusters get decomposed with prepositions or hyphenated on first use: "main-gear-door retraction-winch handle."
- American English spelling.
- No Latin abbreviations: "e.g." becomes "for example," "i.e." becomes "that is," delete "etc."

## Punctuation

- No semicolons. Write two sentences.
- No em dashes or en dashes. Use a period, comma, or colon.
- Parentheses only for references, abbreviations, and item numbers.
- Hyphenate words that act as one unit; a hyphenated word counts as one word.
- No contractions.

## Warnings, cautions, notes

- **WARNING** means risk of injury or death. **CAUTION** means risk of damage. **NOTE** means information only, never an instruction.
- Start a warning or caution with the command or condition, then give the risk: "WARNING: Do not touch the terminal. The terminal has a dangerous voltage."
- Notes obey the 25-word descriptive limit.

## Step 2: self-check pass

After drafting, scan the text once for each of these and fix every hit before you respond:

1. Any sentence over the 20 or 25 word limit for its type
2. Contractions, semicolons, em dashes
3. "should," "would," "could," "may," "might"
4. "has been," "have been," "had been," "is being," "was being"
5. -ing words used as verbs
6. Missing articles (a, an, the, this) before nouns
7. Synonym rotation: the same object under two names
8. Any word in the unapproved column of `ste-words.md`
9. Warnings that state the risk before the command
10. Any step, part, number, or condition that is not in the source text. An invented step in a procedure is the most dangerous defect this skill can produce.

## Where to look next

- `ste-words.md` holds the unapproved-to-approved mappings and the one-meaning rulings. Read it before drafting; it is short.
- `ste-examples.md` holds worked before and after rewrites for procedures, descriptions, warnings, and common mistakes. Read it when rewriting existing text or when a rule's application is unclear.

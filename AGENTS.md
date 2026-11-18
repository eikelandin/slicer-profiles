## Commands

- Install the pinned Python tools: `uv sync --locked`. Site: `npm ci --ignore-scripts --no-audit --no-fund` in `site/`.
- Lint and types: `uv run ruff check`, `uv run ruff format --check` (apply: `uv run ruff format`), `uv run basedpyright`.
- Tests: `uv run pytest`. Generated presets against `tests/golden/`: `tests/check.sh`; after an intended output change, `tests/check.sh --update` and review `git diff tests/golden`.
- Repository checks: `uv run shellcheck scripts/*.sh tests/*.sh`, `uv run actionlint`, `uv run zizmor --offline .github`, `uv run typos`, `uv run reuse lint`.
- Regenerate the docs tables after a data change: `uv run python src/docs.py` (`tests/test_docs.py` fails while they are stale).
- Generate presets into `out/` without installing: `scripts/build.sh --no-install`. Release files into `dist/`: `scripts/release.sh vX.Y.Z`. Docs site: `npm run build` in `site/`.
- Changed-files check, run before every push (the CI jobs `python`, `repository` and `generate`; add `npm run build` in `site/` when `site/` or `docs/` changed):
  `uv run ruff check && uv run ruff format --check && uv run basedpyright && uv run pytest && uv run shellcheck scripts/*.sh tests/*.sh && uv run actionlint && uv run zizmor --offline .github && uv run typos && uv run reuse lint && tests/check.sh`

<!-- cedarloom start -->
- Before changing a repository, working on issues or pull requests, or researching two or more items: load the `cl-workflow:workflow` skill when the cl-workflow plugin is installed. It picks the workflow and the depth.
- When goal, scope or expected result is open, write the open questions with your recommendations (including risks and options the user has not named) into one issue per task in the issue tracker the project names, else the report; take each recommendation that is safe and reversible (an item without one waits), and go on. Only while the user allows terminal questions, ask with the question tool (Claude Code: `AskUserQuestion`) instead: one decision per question, related ones in one call. Settle yourself what research, the code, the docs or a safe default answer: say in one line what you chose and why, and prefer the choice that is easy to undo.
- Ask when the choice is the user's (taste, priorities, scope, money, risk). Unsure whether to ask: ask once.
- Research the recommended option before asking (code, docs, an official source, a cheap trial).
- Question text: What (one sentence), Context, the options with the impact and trade-off of each, Recommendation (one option first, labeled "(Recommended)", with reason, source or file and line, confidence), Why now.
- When a check fails, fix the cause. Skip, delete or loosen a check only when the user asks.
- Before designing or changing something, find the established practice (official docs, the standard, the project's own conventions), weigh it, and say which one you followed and its source. Style (naming, formatting, idioms) follows the project; security follows the standard.
- If the user asks for something against best practice, or a simpler approach does the job, say so before doing it: the practice, the concrete risk, a better option. Then follow the user's decision. No warning for a deviation already recorded as deliberate.
- Before every push, after your last edit: run the changed-files check that Commands in `AGENTS.md` names. Never use `--no-verify`.
- Don't poll CI: wait with `gh run watch <run-id> --interval 30 --compact --exit-status` or `gh pr checks --watch --interval 30`.
- main stays releasable. A red main is fixed before anything else merges.
- Make the smallest change that does the whole task, including the callers, tests, fixtures, configuration and docs it breaks or changes. Add nothing speculative: no option, flag, layer, shim or "for later" code; name what you left out in one line of the report.
- Reuse in this order: code the repository has (extend it, never a parallel version; abstract at the second caller, not the first), the standard library or platform, an installed dependency, a maintained package (recent releases, a license the project allows, a size that fits; name it and why in the pull request), own code. A few own lines beat a new dependency.
- Validate where data enters (user input, files, the network, another process) and where a wrong value loses data or breaks security. Inside, trust the types, the framework and your own code: no guard or fallback for a case that cannot happen. An error you cannot handle propagates; never swallow it or hide it behind a default.
- One job per function, module and file, named after it; never `utils`, `helpers`, `common`, `misc` or `shared`. A unit that wants such a name has two jobs: split it.
- Keep the repository's layers: imports point down, never up. Code that gets a test takes the time, randomness and I/O it uses as parameters.
- Remove what your change made unused. Leave other code, comments and formatting as they are; name unrelated dead code in the report.
- Comments only where the code cannot say it: one line, the why, not the how.
- In docs, comments, commits, issues, pull requests and UI text, write what the reader needs to use, build, change or decide. Leave out restated headings, code or labels (a tooltip that repeats its button), feature counts, recaps, offers, hedging and history unless asked. Uncertainty goes in a confidence level.
- In docs, code comments and UI text, state what holds, in a neutral tone. Never record who decided, when, or tracker references: decisions live in the tracker.
- In docs, comments, commits, issues, pull requests and UI text, where an em dash would go, use a comma, colon, parentheses or two sentences. No emojis or emoticons, also inside skill templates.
- In docs, comments, commits, issues, pull requests and UI text, back claims about external things (APIs, versions, prices, laws) with an official source URL, or mark them "unverified". Back claims about the codebase with file and line.
- READMEs and product pages open with one or two plain sentences on what the product does for the reader, then lists, tables or steps.
- UI code follows the styleguide and tokens that Pointers in `AGENTS.md` links. No new colors, font sizes, spacing or shadows when a token already covers the role.
- Every change considers the first-class targets that `AGENTS.md` lists. Before changing an area with a footgun doc, read that doc.
<!-- cedarloom end -->

## Every change considers

- The Bambu Studio release and stock profile tree pinned in `upstream.lock.toml`, and every nozzle, print style and filament in `config/h3c.json` and `config/filaments.json`.
- Generating, checking and releasing on Linux and macOS; installing (`scripts/build.sh` without `--no-install`) on Linux only.
- The release files: the preset zips, `manifest.json` (`schemas/manifest.schema.json`), `NOTICE.md` and `SHA256SUMS`, identical across two runs on one commit.
- The docs site built from `docs/` (`site/`), including the tables `src/docs.py` generates.
- [Side effects outside the repository](docs/agents/side-effects.md): the Bambu Studio preset folder, the fetch cache, the golden files, publishing a release.

## Pointers

- `docs/agents/`: the coordinator policy (`orchestration.json`), extra worker rules (`worker-rules.md`) and footgun docs. The site build excludes this folder (`site/docusaurus.config.js`).
- Issue tracker: GitHub Issues of eikelandin/slicer-profiles. The `cl:*` labels steer agent work; `gh label list` shows what each means.
- Code and data layout: the Layout table in `README.md`. User docs: `docs/install.md`, `docs/profiles.md`, `docs/catalog.md`.
- Every new file needs a license entry in `REUSE.toml` (`uv run reuse lint`).
- Commit subjects and pull request titles follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/), as the history does.

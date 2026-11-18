# Side effects outside the repository

- `scripts/build.sh` without `--no-install` writes into the Bambu Studio preset folder (`~/.config/BambuStudio/user/<account or default>`, scripts/build.sh:11-17 and :43) and records the install in `.installed/`. Agents run `scripts/build.sh --no-install` or `tests/check.sh`; installing is the user's step.
- `src/fetch.py` downloads the pinned stock profile tree on its first run (network) into `$SLICER_PROFILES_CACHE`, default `~/.cache/slicer-profiles/upstream` (src/fetch.py:27). A set `SLICER_PROFILES_BAMBU` replaces the pinned tree in `tests/check.sh`, so unset it before comparing with the golden files.
- `tests/check.sh --update` replaces `tests/golden/` with the current output. Run it only after an intended output change, and review `git diff tests/golden` before committing.
- `scripts/release.sh vX.Y.Z --publish NOTES.md` creates a public GitHub release (scripts/release.sh:30). Only the user publishes.
- Merging a change under `docs/` or `site/` into `main` deploys the public docs site to GitHub Pages (.github/workflows/pages.yml:2-5).

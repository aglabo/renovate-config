---
title: "CHANGELOG"
description: "ChangeLog: 0.0.1"
version: "0.0.1"
date: "2026-11-22"
summary:
  - "0.0.1: Initial release of the shared Renovate preset, migration to renovate.json5 and aglabo/ci-platform workflows, repository config and commit-message tooling"
---

<!-- textlint-disable
  ja-technical-writing/sentence-length,
  ja-technical-writing/max-comma,
  -->
<!-- markdownlint-disable line-length -->

## CHANGELOG

## 0.0.1 - 2026-11-22

### Features

- Add the shared Renovate preset `default.json` (later migrated to `renovate.json5`), with the `github>aglabo/renovate-config` preset reference.

### Documentation

- Add the README and update the organization and `extends` references to `aglabo/renovate-config`.
- Add `SECURITY.md` with supported versions, the reporting procedure, and the disclosure process, and point the advisory link to `aglabo/renovate-config`.

### Refactor

- Replace the `--git-buffer` and `--to-buffer` options of `scripts/prepare-commit-msg.sh` with `--output FILE` (`-o FILE`), merging the output variables into `OUTPUT_FILE`.
- Change the default AI model from `gpt-5.2` to `sonnet`, add `--permission-mode acceptEdits --strict-mcp-config` to the Claude command, and add a fallback that extracts the message from a ` ```text ` code block.
- Harden the script: add `--help`, replace `eval` with array-based execution, support codex, claude, opencode, and copilot, and validate the AI commit header markers.
- Add the `commit-message-generator` agent for Conventional Commits messages, and switch the `lefthook.yml` `prepare-commit-msg` hook to `--model sonnet --output {1}`.
- Replace the Node.js `prepare-dev-env.js` with a bash `prepare.sh` that skips `lefthook install` in CI.

### CI

- Split the monolithic `ci-scan-all.yml` and `codeql-actions-only.yml` into dedicated callers: `ci-scan-secrets.yml` for secret scanning and `ci-workflows-qa.yml` for actionlint and ghalint, both with `contents: read` permissions.
- Migrate the reusable workflows to `aglabo/ci-platform` (`ru-*`) and bump them from v0.3.2 to v0.3.5 (`ru-scan-betterleaks`, `ru-qa-actionlint`, `ru-qa-ghalint`).
- Add the Renovate config validator workflow with `--strict`, and bump `actions/checkout` to v7.0.1 and `actions/setup-node` to v7.0.0.

### Config

- Migrate the Renovate configuration to `renovate.json5`: add the `renovate` label, weekly scheduling (`schedule:weekly`), and `:automergeMinor`, limit `enabledManagers` to github-actions, npm, and pnpm, and restrict digest pinning to GitHub Actions.
- Switch the `.gitignore` to a deny-all allowlist policy that tracks `.claude/agents`, `.claude/rules`, `.claude/commands`, and `.claude/settings.json`, and reorganize `.editorconfig`.
- Rename `configs/commitlint.config.js` to `commitlint.config.mjs` (ESM), extend `type-enum`, and raise the header limit from 72 to 76 characters.
- Add `.claude/settings.json` with git and gh read-only allow rules, deny rules for git write operations, and `defaultMode: plan`.
- Update `package.json` metadata, pin `packageManager` to pnpm 10.27.0, and unify the copyright year range to `2025-`.

### Security

- Rework the Renovate update policy: separate major updates (grouped, no automerge, 5-day release age), keep minor and patch automerge, and add rollback, rebase, and approval settings.
- Add the `gitleaks` and `secretlint` detection configs, and run them in `lefthook.yml` pre-commit together with `commitlint` in commit-msg.

### Chore

- Add `CODEOWNERS`, `.gitignore`, and the initial CI setup.
- Update dependencies: renovate to v41, node to v22, and `actions/checkout` to v5.

### Other

- Initialize the npm package, add `renovate.json`, and adopt pnpm.
- Merge the initial Renovate configuration and dependency update pull requests.

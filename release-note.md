---
title: "renovate-config v0.0.1 Release Note"
description: "Release Note: v0.0.1"
version: "0.0.1"
date: "2026-11-22"
previous: ""
summary:
  - 共有 Renovate プリセット (renovate.json5) の初回リリース
  - 再利用可能ワークフローを aglabo/ci-platform の ru-* に移行し、スキャンと QA を専用ワークフローに分割
  - コミットメッセージ自動生成、commitlint、gitleaks、secretlint などのリポジトリ設定を整備
breaking: false
---

<!-- textlint-disable
  ja-technical-writing/sentence-length,
  ja-technical-writing/max-comma,
  -->

## renovate-config v0.0.1 - 2026-11-22

v0.0.1 は renovate-config の初回リリースです。
`github>aglabo/renovate-config` として参照できる共有 Renovate プリセットと、
CI・コミット規約・シークレット検出などの開発環境設定を提供します。

## Highlights

### 共有 Renovate プリセット

`default.json` として追加した設定を `renovate.json5` に移行しました。

- `extends` に `:label(renovate)`、`schedule:weekly`、`:automergeMinor` を追加
  - PR に renovate ラベルを付け、週次で実行し、minor 更新を自動マージ
- `enabledManagers` は github-actions / npm / pnpm の 3 つに限定
- digest pinning は GitHub Actions のみが対象
- major 更新はグループ化し、自動マージなし・5 日の熟成期間を設定
- rollback、rebase、approval のポリシーとセキュリティ更新の挙動を追加
- 利用側は `extends: ["github>aglabo/renovate-config"]` で参照

### CI ワークフローの再構成

- 一体型の `ci-scan-all.yml` と `codeql-actions-only.yml` を廃止し、専用の呼び出し元に分割
  - `ci-scan-secrets.yml`: シークレットスキャン
  - `ci-workflows-qa.yml`: actionlint と ghalint
- 再利用可能ワークフローを `aglabo/ci-platform` の `ru-*` に移行し、v0.3.5 に更新
- `renovate-config-validator.yml` を追加し、`--strict` で設定を検証
- `actions/checkout` を v7.0.1、`actions/setup-node` を v7.0.0 に更新
- すべてのワークフローで permissions を `contents: read` に限定

### コミットメッセージ自動生成

- `scripts/prepare-commit-msg.sh` のオプションを `--output FILE` (`-o FILE`) に統一
  - 既定の AI モデルを `sonnet` に変更
  - `--help` を追加し、`eval` を配列実行に置き換え
  - codex / claude / opencode / copilot に対応
- Conventional Commits 準拠の `commit-message-generator` エージェントを追加
- lefthook の `prepare-commit-msg` は `--model sonnet --output {1}` を実行

### リポジトリ設定

- commitlint を ESM の `commitlint.config.mjs` に変更し、ヘッダ上限を 76 文字に変更
- gitleaks と secretlint の検出設定を追加し、lefthook の pre-commit で実行
- `.claude/settings.json` を追加し、git の書き込み系操作を拒否、`defaultMode` は `plan`
- `.gitignore` を deny-all の allowlist 方式に変更し、`.editorconfig` を整理
- `package.json` のメタデータを整備し、pnpm を 10.27.0 に固定

## Other Changes

- README と `SECURITY.md` を追加し、参照先を `aglabo/renovate-config` に統一
- `CODEOWNERS` を追加
- 依存関係を更新: renovate v41、node v22、`actions/checkout` v5
- 初期の `npm init`、pnpm の採用、Renovate 初期設定 PR のマージ

## Migration

初回リリースのため、移行作業はありません。
利用側のリポジトリでは、`extends` に `github>aglabo/renovate-config` を指定してください。

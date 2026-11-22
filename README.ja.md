# Common Renovate configuration for aglabo/atsushifx

## About

GitHub Organization 全体で有効化したい Renovate の設定をまとめたものです。

## Usage

```json
{
  "extends": [
    "github>aglabo/renovate-config"
  ]
}
```

## Configuration

### extends

- [config:recommended](https://docs.renovatebot.com/presets-config/#configrecommended) のみ有効化

### schedule

- Timezone: Asia/Tokyo
- 毎週月曜日の 1時から 3時までに PR が作成される
- 毎週月曜日の 3時から 6時までに PR がマージされる
- 一度に作成される PR の作成数に制限は設けない
- PR の rebase や更新はスケジュール外では行わない

### packageRules

- major, minor, patch, pin に応じてラベルを付与する
- minor, patch, pin の場合は automerge を有効化する
- patch はリリース後 3日、minor はリリース後 5日の経過を確認する
- GitHub Actions は、`actions/` 配下ではないものは、SHA256 のハッシュ値を指定する

### other

- dependencyDashboard の有効化

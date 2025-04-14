# Spotide/行きたい場所リスト共有アプリ

## サービスの概要  
「Spotide（スポティード）」は、旅行やおでかけの計画をスムーズにするための店舗検索・共有アプリです。  
Googleマップと連携し、店舗を簡単に検索、リスト化、グループで共有、投票まで一貫して可能です。

## サービスのURL
https://spotide.vercel.app/login  
リストの作成はGoogleアカウントでログインすることが可能です。  
リストの参加はログインしていなくても可能です。

##  アプリ機能一覧・手順（イメージ図）
| ログイン画面ページ |　リスト作成ページ |リスト一覧（共有・個人）|
| ---- | ---- | ----|
| ![image](https://github.com/user-attachments/assets/c5769213-5082-409c-a1d9-74e8e0dfeb37)|![image](https://github.com/user-attachments/assets/63e7cf40-bbe3-4797-b88e-93de281a485f)|![image](https://github.com/user-attachments/assets/2c073689-c054-4c55-bf22-aa41b8d07f79)|
|<ul><li>Google認証を使用してログインします。</li></ul> | <ul><li>リストの作成を行います。</li><li> 投票開始日になると編集不可になる仕様のため期日として設定してください。</li><li> 個人リストは作成者のみ編集が可能です。<li>共有リストは参加者の編集も可能です。</li><li>投票は共有・個人いずれも可能です。</li></ul> |<ul><li>作成したリストの一覧が表示されます。</li><li>管理者のみ削除が可能です。</li><li>自分が参加しているリストも表示されます。</li><li>投票開始日になると編集ボタンが非表示になります。</li></ul>|

| 編集ページ| 場所検索ページ| リスト追加|
| ---- | ---- | ----|
| ![image](https://github.com/user-attachments/assets/52eaaf6d-f8ef-4fce-b187-0629f72f6ea0) |![image](https://github.com/user-attachments/assets/189dd479-4b4c-4a87-8d82-f572c3564ae0) |![image](https://github.com/user-attachments/assets/c314007b-d6f7-49f6-8f10-3cb9208be56b)|
| <ul><li>編集ページです。ここに検索したアイテムを追加します。</li></ul>|  <ul><li>ハンバーガーメニューの「場所を検索」で遷移できます。調べたい場所をキーワードで検索してください。（例：イタリアン等）</li></ul> | <ul><li>「リストに追加」ボタンで編集リストに追加できます。</li></ul> |

| 共有ユーザー設定ページ | 閲覧URL発行 | 閲覧リスト認証ぺージ |
| ---- | ---- | ----|
| ![image](https://github.com/user-attachments/assets/71312c5f-5605-419c-b188-7be7047b0deb)|![image](https://github.com/user-attachments/assets/0ea0914e-ee74-49c1-8a6e-51e3e9627268)|![image](https://github.com/user-attachments/assets/4e1a6984-4a30-4b27-b3bd-fad91f5be00d)
| <ul><li>リストに参加するユーザーの設定ができます。ハンバーガーメニューの「共有ユーザー設定」で遷移できます。</li><li>ユーザー追加で、名前とパスワードを設定してください。</li><li>詳細ボタンを押すと、リストに参加するためのIDとPWがコピー可能です。</li></ul> | <ul><li>編集リストに戻り閲覧専用のURLを発行します。参加ユーザー参加してもらうためのURLにもなります。</li></ul> | <ul><li>閲覧するボタンを押すとページの認証にうつります。「共有ユーザー設定」で設定したIDとPWを入力して認証を行います。</li></ul> |

| 閲覧リストぺージ | 投票 | 集計 |
| ---- | ---- | ----|
| ![image](https://github.com/user-attachments/assets/40347315-015c-47a2-a325-7f9129765b6a)|![image](https://github.com/user-attachments/assets/cb0c04c6-e1b1-4961-bb07-c28f3ad06983) |![image](https://github.com/user-attachments/assets/7e3e859a-3d10-47d1-9849-aa8e1d4e268d)
| <ul><li>認証に成功すると閲覧ページにうつります。編集する場合は、編集ボタンから遷移可能です。</li></ul> | <ul><li>リストの作成で設定した投票開始日を過ぎると投票ボタンが表示されるので、投票を行います。</li></ul> | <ul><li>参加者全員の投票が終わると、集計ボタンがリストの作成者のみ表示されます。</ul> |


| 集計結果 |  
| ---- |
|![image](https://github.com/user-attachments/assets/19a11d6d-1748-4c8b-9a7a-d156a0558166)|
|<ul><li>集計結果ボタンより投票結果の確認が可能です。</li></ul>| 


## テーマ
[テーマはこちら](/documents/THEME.md)

## 要件の定義
[要件定義はこちら](/documents/REQUIREMENT_DEFINITION.md) 

## 業務フローチャート
[業務フローチャートはこちら](/documents/BUSINESS_FLOW.md) 

## テーブル定義書/ER図
![supabase-schema-yfjjvdxazuebboovhqux](https://github.com/user-attachments/assets/1807f46f-b019-4969-8cd8-e0d64ea5c8b3)


##  使用技術一覧  
###  フロントエンド
| ライブラリ | バージョン |
|-----------|------------|
| Next.js | 15.1.5 |
| React | 18.3.1 |
| React DOM | 18.3.1 |
| TypeScript | 5.7.3 |
---
###  データベース
- Supabase
- ---
###  認証・セッション
- NextAuth.js（Google認証） (`next-auth` v4.24.11)
---
###  UI ライブラリ・スタイリング
| ライブラリ               | バージョン   |
|--------------------------|--------------|
| Chakra UI                | `@chakra-ui/react` v2.10.5 |
| Chakra Icons             | `@chakra-ui/icons` v2.2.4  |
| Chakra Next.js Integration | `@chakra-ui/next-js` v2.4.2 |
| Tailwind CSS             | v3.4.1       |
| Tailwind Scrollbar       | v2.1.0       |
| Emotion (CSS-in-JS)      | `@emotion/react` v11.14.0 / `@emotion/styled` v11.14.0 |
| Framer Motion            | v12.0.6      |
---
###  UI コンポーネント
| ライブラリ               | バージョン   |
|--------------------------|--------------|
| React Datepicker         | v7.6.0     |
| Splide.js                | `@splidejs/react-splide` v0.7.12 / `@splidejs/splide` v4.1.4 |

---
###  その他ライブラリ 
| ライブラリ     | バージョン |
|----------------|------------|
| Axios          | v1.8.4     |
| Date-fns       | v4.1.0     |
| ESLint         | v9.23.0    |
| Prettier       | v3.5.3     |
| PostCSS        | v8         |
| Autoprefixer   | v10.4.20   |
| ESLint Config (Next) | `eslint-config-next` v15.1.5 |
| ESLint Config Prettier | `eslint-config-prettier` v10.1.1 |
| ESLint Plugin Prettier | `eslint-plugin-prettier` v5.2.6 |
| UUID Type Definitions | `@types/uuid` v10.0.0 |
| Node Types     | `@types/node` v20 |
| React Types    | `@types/react` v19 |
| React DOM Types| `@types/react-dom` v19 |
| React Slick Types | `@types/react-slick` v0.23.13 |
---
###  インフラ
- Vercel（デプロイ・ホスティング）
---
###  バージョン管理
- Git/GitHub
---
##  今後の実装予定
- **詳細検索:** 場所の詳細検索機能の追加。 
- **更新通知:** リストが更新された際に通知が届く。 
- **投票終了通知:** 投票が完了した際に全員に結果を通知。
- **投票開始日編集:** 投票開始日をリスト作成後に編集できるようにする。
- **投票のやりなおし:** 個別投票後や集計後のやりなおし機能も追加。
- **双方のフラグ更新連携:**　お気に入りや行ってみたいフラグの更新をリアルタイムで連携できる  
- **フラグによるソート:**　Googleのお気に入り機能を利用してソート等ができる
- **リストの分類:** 作成したリストからさらにジャンル別、地域別などでリスト化も可能。
- **お店のレビューも取得:** 同左
- **編集ページの機能追加:** リセットボタンを設ける（アイテムを全削除・追加アイテムへの編集リセット機能（表示ラベル設定・カスタムラベル・両方））※ただし並び替えや絞込みは手動でリセット」　　
- **リスト複製:** リストを複製することで、一度投票済みのものを使い回しが可能

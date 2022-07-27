# カロリー記録アプリ(Nuxt.js Ver)

## このアプリでできること
日々、食べた物の情報を記録できる。食べ物の情報としては、食べ物の名前・食べた日付・食べた時間帯(例: 昼食など)・食べ物のカロリーからなる。また、それらの情報を編集・削除できる。

## アプリを作成した理由
リモートワーク主体の働き方の影響を受けて、最近体重が気になり始めた。。  
なので、自身のダイエットに役立てようと、日々食べた物のカロリーを記録できるようなアプリを作った。

## アプリを作成した理由(技術観点)
業務でNuxt.jsを使用してフロントエンド開発を行なっているが、新機能開発や既存機能改修などがメインで一からアプリを構築して開発を行なった経験がなかった。  
なので、業務で扱っている技術メインでアプリ作り、あわよくば技術の深掘りができれば良いなと思ったから。  
また、Firebaseを触ってみたいと思っていたから。

## 工夫した点
- 一覧画面に表示されている食べ物を食べた時間帯については、ラベルで表現するようにして、ユーザーが直感的に分かりやすくなるように工夫した。
- 一覧画面に表示されている情報については、ただ情報を羅列するだけではユーザー体験が損なわれると感じたため、日付ごとに絞り込みを行えるように工夫した。

## まだ実装できていない部分・導入して微妙だと感じた部分
- 非同期通信を行なっている間は、ローディングのアニメーションを入れて操作できないようにしたい。
- 削除ボタンを押下後、確認モーダル表示するようにしたい。
- 1日の合計摂取カロリーを表示できるようにしたい。
- 1日の消費カロリーを表示できるようにしたい。
- 機能数が少ないので、状態管理Vuexの恩恵があまり感じられなかった。

## 主要ライブラリのバージョン情報
- Nuxt 2.15.7
- vuex-module-decorators 2.0.0
- Element UI 2.15.2
- Firebase 9.8.2

## 関連記事
- [Nuxt.js × Firebase(Realtime Database) のDBやりとり](https://zenn.dev/shibari_yo/articles/512d2609d32d98)
  - このアプリで使用しているRealtime Databaseに焦点を当てて記事を書いた。

## コマンド関連

```bash
# セットアップ
$ yarn install

# サーバーの立ち上げ
$ yarn dev

# ビルド
$ yarn build
```

## 現時点でのアプリの挙動
### 日付の絞り込み
https://user-images.githubusercontent.com/64350081/181134518-be40e6c9-d3f4-4e64-bc06-25c365f53acd.mov

### 食べ物の登録
https://user-images.githubusercontent.com/64350081/181134592-66f722d6-aba4-4c7b-b3f9-dcb222ca1b5d.mov

### 食べ物の編集
https://user-images.githubusercontent.com/64350081/181134634-4fd61f57-54f4-4d7b-8ddf-43413054d14b.mov

### 食べ物の削除
https://user-images.githubusercontent.com/64350081/181134667-f708a51d-ba7f-45f2-b57c-6062821ee42e.mov

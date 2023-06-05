# SNPFM - Steam Now Playing for Misskey

Steam Now Playing は、node.js で動作する Steam の起動と終了を Misskey に投稿するものです。

## 動作確認済みサーバー

- [Misskey](https://github.com/misskey-dev/misskey)(13.13.0-beta.3)
- [Calckey](https://codeberg.org/calckey/calckey)(14.0.0-dev26)

# 使い方

このソフトウェアを使用するには、以下の物が必要です。

- Node.js v18 以降
- Misskey の API キー
- Steam の Web API キー

## Misskey の API キーの取得方法(MISSKEY_API_KEY)

1. **設定 > API**に移動します。
2. **アクセストークンの発行**をクリックします。
3. **名前**はお好みで、**権限**に**ノートの作成・削除する**にチェックします。
4. 右上の**✓**をクリックし、API キーが出てくるので、それをコピーします。

## Steam の Web API キーの取得方法(STEAM_API_KEY)

1. https://steamcommunity.com/dev/apikey にアクセスします。
2. ログインしていない場合は、ログインしてください。
3. **Steam Web API キー登録**というページが表示されるので、自身が持っているドメイン名を入力しましょう、最悪 example.com でも localhost でも大丈夫です。
4. 同意規約(英文)を読み、**I agree to the Steam Web API Terms of Use**にチェックを入れて**登録ボタン**を押します。
5. **あなたの Steam Web API キー**という画面が表示されるので、**API**のキーをコピーします。

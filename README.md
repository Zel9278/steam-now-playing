# SNPFM - Steam Now Playing for Misskey

**Steam Now Playing for Misskey** は、Node.js で動作する**任意の Steam ゲーム**の起動と終了を Misskey に投稿するソフトウェアです。

## 動作確認済みサーバー

- [Misskey](https://github.com/misskey-dev/misskey) (13.13.0-beta.3, 13.12.2)
- [Calckey](https://codeberg.org/calckey/calckey) (14.0.0-dev26)

# 使い方

このソフトウェアを使用するには、以下のものが必要です。

- Node.js v18 以降
- 使用したい Misskey の API キー
- 自身の Steam アカウント の Web API キー

## セットアップ

`git clone` などでリポジトリを clone 後、 `npm i` で依存関係をインストールし、以下の手順に従って `example.env` を編集してください。

## Misskey のホスト名 (MISSKEY_HOST)

使用したい Misskey のホスト名をそのままコピペで問題ないです。  
**URL ではない**ため、`https://`などは不要です。

## Misskey の API キーの取得方法 (MISSKEY_API_KEY)

1. **設定 > API**に移動します。
2. **アクセストークンの発行**をクリックします。
3. **名前**はお好みで、**権限**に**ノートの作成・削除する**にチェックします。
4. 右上の**✓**をクリックし、API キーが出てくるので、それをコピーします。

## Steam の Web API キーの取得方法 (STEAM_API_KEY)

1. https://steamcommunity.com/dev/apikey にアクセスします。
2. 自身のアカウントでログインされていることを確認してください。  
   違うアカウントでログインされている場合は使用したいアカウントで再ログインしてください。
3. **Steam Web API キー登録**というページが表示されるので、自身が持っているドメイン名を入力してください。  
   所有していない場合は example.com や localhost でも大丈夫です。
4. 同意規約(英文)を読み、**I agree to the Steam Web API Terms of Use**にチェックを入れて**登録ボタン**を押します。
5. **あなたの Steam Web API キー**という画面が表示されるので、**API**のキーをコピーします。

## Steam のユーザー ID の取得方法 (STEAM_USER_ID)

1. [自身の Steam プロフィール](http://steamcommunity.com/my/profile)にアクセスします。
2. **Ctrl+U**または**右クリック > ページのソースを表示**でソースを開きます。
3. **Ctrl+F > g_steamid**で検索します。
4. **g_steamid**の値をコピーします。

## 実行

`example.env` の編集が完了したら `.env` にリネームしたあと、`node .`で実行し、Steam の適当なゲームを起動してください。  
正しくセットアップできていれば Misskey 側に投稿されています。お疲れ様でした。

<div align="center">

<img src="https://user-images.githubusercontent.com/34514603/243289593-edb7dd1e-6599-42f7-9398-c6a4d30bb0af.png" alt="console">

<table>
  <tr>
    <td align="center"><img src="https://user-images.githubusercontent.com/34514603/243289985-a6997782-b33b-496e-8978-765a0f83a327.png" alt="start"></td>
    <td align="center"><img src="https://user-images.githubusercontent.com/34514603/243290221-7f9bfe9a-7d18-43c2-bb68-67b76257359e.png" alt="end"></td>
  </tr>
</table>

</div>

`pm2-windows-startup` などでサービス化してもいいでしょう。

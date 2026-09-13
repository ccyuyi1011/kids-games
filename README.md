# 小动物棋乐园

给小朋友玩的网页棋类游戏，可以和电脑小动物对战，也可以和家人一起玩。

- `kids.html`：五子棋乐园
- `tiaoqi.html`：跳棋乐园（中国跳棋）
- `doushouqi.html`：斗兽棋乐园
- `index.html`：最早的五子棋版本

## 装到 iPad 上

1. 用 iPad 的 Safari 打开 `.../kids.html`、`.../tiaoqi.html` 或 `.../doushouqi.html`
2. 点分享按钮 → **添加到主屏幕**
3. 以后点主屏幕上的图标就能全屏玩，没网也能玩

## 更新游戏

改完页面后，把 `sw.js` 里的 `CACHE` 版本号加一（比如 `kids-games-v2` 改成 `kids-games-v3`）再发布。
iPad 联网打开一次后，下一次打开就是新版本。

# UI-db

個人 UI 效果與工具資料庫 —— db 同時是 **dashboard** 也是 **database**。
每筆收藏都有：可即時播放的 demo、中英文名稱、使用情境標籤，以及可直接貼給 AI（Claude / Codex）的提示詞。

## 啟動

```bash
npm install
npm run dev
```

## 目前收藏

| 收藏集 | 數量 | 來源 |
| --- | --- | --- |
| 文字動態 40 招（Text Motion 40） | 40 | [Threads @ai_tjb](https://www.threads.com/@ai_tjb/post/DeeHoA3ktZ5) |

## 功能

- 側欄切換收藏集、我的最愛（★ 存在瀏覽器 localStorage）
- 組別篩選（IMPACT / FLOW / DEPTH / SWITCH / STYLE）與全文搜尋（中文名、英文名、標籤、描述），按 `/` 聚焦搜尋
- 點卡片開大圖，可「複製提示詞」或「複製名稱」；網址會帶 `#tm-12` 方便直接分享某一招
- demo 只在捲到畫面內時播放，節省效能

## 專案結構

```
src/
  data/
    collections.js          # 分類與收藏集（來源、組別）
    items/text-motion-40.js # 每一招的資料：名稱、描述、標籤、提示詞
    index.js                # 匯總所有項目
  demos/
    index.js                # collection → demos 對照、組別主色
    utils.js                # 共用工具（跑馬燈、計時器…）
    text-motion/            # 40 招的實作（index.js + text-motion.css）
  styles/app.css            # dashboard 介面
```

## 新增一個收藏集

1. 在 `src/data/collections.js` 加一筆 collection（需要新分類就加到 `categories`）。
2. 建立 `src/data/items/<id>.js`，每筆至少有 `id / collection / no / zh / en / desc / tags / prompt / demo`。
3. 在 `src/data/index.js` import 並加進 `items`。
4. 在 `src/demos/` 建資料夾寫 demo：`{ [demoKey]: { bg: 'dark' | 'accent' | 'light', run(el) { …; return cleanup } } }`，並在 `src/demos/index.js` 註冊。
   舞台 `el` 是 `container-type: size`，可以用 `cqw / cqh` 讓 demo 隨卡片縮放。

# 磁帶電台 / Tape Radio

一個無需安裝依賴的靜態互動網站。
An interactive static website that requires no installation.

## 下載與開啟 / Download and open

1. 在本倉庫頁面點擊綠色的 **Code → Download ZIP**。
   On this repository page, click the green **Code → Download ZIP** button.
2. **解壓整個 ZIP**，保留原有的檔案與資料夾結構。
   **Extract the entire ZIP** and keep the original folder structure.
3. 在解壓後的資料夾中，用瀏覽器開啟 **`index.html`**。
   Open **`index.html`** from the extracted folder in a browser.

以下檔案與資料夾必須放在一起 / Keep these files and folders together:

```text
index.html
tape-radio-upgrade.css
tape-radio-upgrade.js
tape-radio-audio-chain.js
images/
audio/
```

**不要只下載或移動 `index.html`。** 如果旁邊缺少 CSS 和 JavaScript 檔案，網頁會顯示未升級的基礎版，沒有中英文標籤、分區邊框和新版按鍵。缺少 `images/` 或 `audio/` 時，圖片或聲音也無法載入。

**Do not download or move `index.html` by itself.** Without the CSS and JavaScript files beside it, the page falls back to the basic layout without bilingual labels, section borders, or updated controls. Missing `images/` or `audio/` will also prevent images or sound from loading.

如果沒有聲音，請先在頁面上按 **PLAY**；瀏覽器可能需要一次用戶操作才允許播放音頻。
If there is no sound, press **PLAY** on the page; your browser may require a user interaction before playing audio.

# History API Webpack Note

藉由 History API 實現「上、下一頁切換筆記」，並以 Webpack 打包。

## 展示

![screenshot](https://github.com/nepikn/history-note/blob/main/src/asset/screenshot.jpg)

[Live Demo](https://nepikn.github.io/history-note/)

## 主要技術

- History API
- Webpack v5
- Bootstrap v5
- Localforage v1
- UUID v9

## 學習內容

### History API

```jsx
// index.js
(async function init() {
  window.onpopstate = ({ state }) => {
    handleHistoryChange(state, null);
  };

  document.onclick = handleLinkClick;

  // ...

  handleHistoryChange({ noteId }, "replaceState");
})();

function handleLinkClick(e) {
  const href = e.target.href;
  if (!href) return;

  e.preventDefault();

  handleHistoryChange({ noteId: getUrlQueryNoteId(href) });
}

// ...

function handleHistoryChange(state, method = "pushState") {
  render(state);

  if (method === null) return;
  handleHistoryState(state, method);
}
```

```jsx
// history.js
export function handleHistoryState(state, method) {
  history[method](state, "", getPageUrl(state.noteId));
}

export function getPageUrl(noteId) {
  const query = new URLSearchParams();
  const pathname = location.pathname;

  query.set("id", noteId);

  return `${pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}?${query}`;
}

export function getUrlQueryNoteId(url = document.location) {
  return new URL(url).searchParams.get("id");
}
```

#### `history.replaceState`

- 用於編輯當前的 history entry
- 本次用於編輯「SPA 初始載入所對應的 history entry」

#### `history.pushState`

- 用於添加新的 history entry
- 本次用於「切換、新增、刪除筆記之後添加新的 history entry」

#### `popstate` event

- 頁面切換從開始到完成可能觸發的事件之一
- 如果 `History.state` 與先前不同則觸發本事件
- 本事件屬性 `state` 即為 `History.state`
- 本次以 `state.noteId` 記錄不同 history entry 的狀態

### Webpack

- 轉譯 `import` 和 `export`
- 以下為模組之間依賴關係的界定依據
  - `import`
  - `require()`
  - `@import`
  - `url()`
  - `<img src=... />`
- 以下為原生支援的模組類型
  - ECMAScript 模組
  - CommonJS 模組
  - AMD 模組
  - Assets（圖片、字型等等）
  - WebAssembly 模組
- 模組引入或載入前可由 loader 預先處理（以便引入 CSS 等等）
- 模組引入
  - `resolve.modules` 作為模組搜尋的路徑預設為 `['node_modules']`
  - 缺乏副檔名的模組路徑以 `resolve.extensions`（預設為 `['.js', '.json', '.wasm']`）作為副檔名
  - `resolve.fullySpecified` 預設為 `true` 故在 ECMAScript 模組中**預設無法**省略「模組引入路徑的副檔名」

## 相關資源

- [MDN - Working with the History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)
- [Webpack - Guides](https://webpack.js.org/guides/)
- [stack overflow - Compiling vs Transpiling](https://stackoverflow.com/a/44932758)

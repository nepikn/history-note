import "./index.css";

const appName = "localStorage-note";

document.querySelector("title").innerText = appName
  .split("-")
  .map((s) => s[0].toUpperCase() + s.slice(1))
  .join(" ");

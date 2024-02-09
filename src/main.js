import localforage from "localforage";
import { handleHistoryState } from "./history";
import { addNote, delNote, setupNoteDb } from "./note";
import { getNoteId, render } from "./render";
import "./style/index.css";

document.querySelector("title").innerText = import.meta.env.BASE_URL.slice(1)
  .split("-")
  .map((s) => s[0].toUpperCase() + s.slice(1))
  .join(" ");

(async function init() {
  window.onpopstate = handleHistoryChange;
  document.onclick = handleLinkClick;
  document.querySelector(".add").onclick = handleAddNote;
  document.querySelector(".del").onclick = handleDelNote;
  document.querySelector("textarea").oninput = handleTextareaInput;

  // localforage.clear();
  const noteId = await setupNoteDb();

  handleHistoryChange({ noteId }, "replaceState");
})();

function handleLinkClick(e) {
  const href = e.target.href;
  if (!href) return;

  e.preventDefault();

  handleHistoryChange({ noteId: getNoteId(href) });
}

async function handleAddNote() {
  handleHistoryChange({ noteId: await addNote() });
}

async function handleDelNote() {
  const nextNotes = await delNote(getNoteId());
  handleHistoryChange({ noteId: nextNotes[0].id });
}

function handleHistoryChange(eventOrState, method = "pushState") {
  render(eventOrState.state ?? eventOrState);

  if (eventOrState instanceof PopStateEvent) return;
  handleHistoryState(eventOrState, method);
}

async function handleTextareaInput(e) {
  await addNote({ id: getNoteId(), text: e.target.value });
}

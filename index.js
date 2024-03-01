import localforage from "localforage";
import { handleHistoryState } from "./src/history";
import { addNote, delNote, setupNoteDb } from "./src/note";
import { render } from "./src/render";
import { getNoteId } from "./src/history";
import "./src/style/index.scss";

(async function init() {
  window.onpopstate = ({ state }) => handleHistoryChange(state, null);
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

async function handleTextareaInput(e) {
  await addNote({ id: getNoteId(), text: e.target.value });
}

function handleHistoryChange(state, method = "pushState") {
  render(state);

  if (method === null) return;
  handleHistoryState(state, method);
}

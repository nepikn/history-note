import localforage from "localforage";
import { getUrlQueryNoteId, handleHistoryState } from "./src/history";
import { addNote, delNote, editNote, setupNoteDb } from "./src/note";
import { render } from "./src/render";
import "./src/index.scss";

(async function init() {
  window.onpopstate = ({ state }) => handleHistoryChange(state, null);
  document.onclick = handleLinkClick;
  document.querySelector(".add").onclick = handleAddNote;
  document.querySelector(".del").onclick = handleDelNote;
  document.querySelector("textarea").oninput = handleTextareaInput;

  // localforage.clear();
  const firstId = await setupNoteDb();
  const searchId = getUrlQueryNoteId();
  const noteId = searchId ?? firstId;

  handleHistoryChange({ noteId }, "replaceState");
})();

function handleLinkClick(e) {
  const href = e.target.href;
  if (!href) return;

  e.preventDefault();

  handleHistoryChange({ noteId: getUrlQueryNoteId(href) });
}

async function handleAddNote() {
  handleHistoryChange({ noteId: await addNote() });
}

async function handleDelNote() {
  const nextNotes = await delNote(getUrlQueryNoteId());
  handleHistoryChange({ noteId: nextNotes[0].id });
}

async function handleTextareaInput(e) {
  const noteId = getUrlQueryNoteId();

  await editNote({ id: noteId, text: e.target.value });
  render({ noteId });
}

function handleHistoryChange(state, method = "pushState") {
  render(state);

  if (method === null) return;
  handleHistoryState(state, method);
}

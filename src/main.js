import "./index.css";
import { getNotes, addNote, delNote } from "./note";

const appName = "localStorage-note";

document.querySelector("title").innerText = appName
  .split("-")
  .map((s) => s[0].toUpperCase() + s.slice(1))
  .join(" ");

(async function init() {
  let notes = await getNotes();

  if (!notes) {
    await addNote();
  }

  document.querySelector(".add").onclick = handleAddNote;
  document.querySelector(".del").onclick = handleDelNote;
  document.querySelector("textarea").oninput = handleTextareaInput;

  updateTextarea(Object.keys(notes)[0]);
  updateNav();
})();

async function handleAddNote() {
  updateTextarea(await addNote());
  updateNav();
}

async function handleDelNote() {
  updateTextarea(await delNote(document.querySelector("textarea").id));
  updateNav();
}

async function handleTextareaInput(e) {
  await addNote(e.target.value, e.target.id);
}

async function updateTextarea(noteId) {
  const textarea = document.querySelector("textarea");
  const notes = await getNotes();

  textarea.id = noteId;
  textarea.value = notes[noteId];
}

async function updateNav() {
  document.querySelector("nav").replaceChildren(
    ...Object.keys(await getNotes()).map((id) => {
      const btn = document.createElement("button");

      btn.id = id;
      btn.append(id);
      btn.onclick = (e) => {
        updateTextarea(e.target.id);
      };

      return btn;
    })
  );
}

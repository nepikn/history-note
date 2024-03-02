import { getNoteId, getPageUrl } from "./history";
import { getNotes } from "./note";

export async function render({ noteId }) {
  const notes = await getNotes();
  const note = notes.find(({ id }) => id == noteId);

  updateTextarea(note);
  updateNav(notes);
}

function updateTextarea(note) {
  const textarea = document.querySelector("textarea");
  const text = note?.text;

  if (text == undefined) {
    textarea.value = "Not found (might have been deleted)";
    textarea.disabled = true;
  } else {
    textarea.value = text;
    textarea.disabled = false;
    textarea.focus();
  }
}

function updateNav(notes) {
  const nav = document.querySelector("nav");
  const curNoteId = getNoteId();

  nav.querySelector("ul").replaceChildren(
    ...notes.map(({ id: noteId, text }) => {
      const temp = nav.querySelector("template").content.cloneNode(true);
      const link = temp.querySelector("a");

      link.href = getPageUrl(noteId);
      link.innerText = text || "(empty)";
      if (noteId == curNoteId) {
        link.classList.add("active");
      }

      return temp;
    })
  );

  document.querySelector(".del").disabled = nav.children.length == 1;
}

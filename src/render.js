import { getNotes } from "./note";

export async function render({ noteId }) {
  const notes = await getNotes();
  const note = notes.find(({ id }) => id == noteId);

  updateTextarea(note);
  updateNav(notes);
}

function updateTextarea(note) {
  const textarea = document.querySelector("textarea");

  textarea.value = note?.text;
  textarea.disabled = note?.text == undefined;
}

function updateNav(notes) {
  const nav = document.querySelector("nav");
  const curNoteId = getNoteId();

  nav.replaceChildren(
    ...notes.map(({ id: noteId }) => {
      const link = document.createElement("a");

      link.href = `${import.meta.env.BASE_URL}/${noteId}`;
      link.append(noteId);
      link.className = noteId == curNoteId ? "active" : "";

      return link;
    })
  );

  document.querySelector(".del").disabled = nav.children.length == 1;
}

export function getNoteId(pathname = location.pathname) {
  return pathname.match(/[^\/]*$/)[0];
}

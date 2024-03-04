import localforage from "localforage";
import { v4 } from "uuid";

export async function setupNoteDb() {
  const notes =
    (await getNotes()) ??
    (await setNotes([
      { id: v4(), text: "(. ❛ ᴗ ❛.)\n" },
      { id: v4(), text: "" },
    ]));
  const noteId = notes[0]?.id ?? (await addNote());

  return noteId;
}

export async function addNote(note = { id: v4(), text: "" }) {
  await setNotes((await delNote(note.id)).concat(note));

  return note.id;
}

export async function getNote(noteId) {
  return (await getNotes()).find(({ id }) => id == noteId);
}

export async function editNote({ id: noteId, text }) {
  const nextNotes = (await getNotes()).map((note) =>
    note.id == noteId ? { id: noteId, text } : note
  );

  await setNotes(nextNotes);

  return nextNotes;
}

export async function delNote(noteId) {
  const nextNotes = (await getNotes()).filter(({ id }) => id != noteId);

  await setNotes(nextNotes);

  return nextNotes;
}

export function getNotes() {
  return localforage.getItem("notes");
}

export async function setNotes(notes) {
  await localforage.setItem("notes", notes);
  return notes;
}

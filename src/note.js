import localforage from "localforage";
import { v4 } from "uuid";

export async function addNote(note = { id: v4(), text: "" }) {
  await setNotes((await delNote(note.id)).concat(note));

  return note.id;
}

export async function delNote(noteId) {
  const nextNotes = (await getNotes()).filter(({ id }) => id != noteId);
  setNotes(nextNotes)
  return nextNotes;
}

export function getNotes() {
  return localforage.getItem("notes");
}

export async function setNotes(notes) {
  localforage.setItem("notes", notes);
  return notes;
}

export async function setupNoteDb() {
  const notes = (await getNotes()) ?? (await setNotes([]));
  const noteId = notes && notes.length ? notes[0].id : await addNote();
  return noteId;
}

import localforage from "localforage";
import { v4 } from "uuid";

export async function addNote(text = "", noteId = v4()) {
  await setNotes({
    ...(await getNotes()),
    [noteId]: text,
  });

  return noteId;
}

export async function delNote(noteId) {
  const nextNotes = { ...(await getNotes()) };

  delete nextNotes[noteId];

  await setNotes(nextNotes);

  return Object.keys(nextNotes)[0];
}

export function getNotes() {
  return localforage.getItem("notes");
}

export async function setNotes(notes) {
  localforage.setItem("notes", notes);
}

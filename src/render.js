import { getUrlQueryNoteId, getPageUrl } from "./history";
import { getNote, getNotes } from "./note";

export async function render({ noteId }) {
  updateTextarea((await getNote(noteId))?.text);
  updateNav(await getNotes());
}

function updateTextarea(text) {
  const textarea = document.querySelector("textarea");

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

  nav.querySelector("ul").replaceChildren(
    ...notes.map(({ id: noteId, text }) => {
      const temp = nav.querySelector("template").content.cloneNode(true);
      const link = temp.querySelector("a");

      link.href = getPageUrl(noteId);
      link.innerText = text.match(/.+/)?.at(0) ?? "(empty)";
      if (noteId == getUrlQueryNoteId()) {
        link.classList.add("active");
      }

      return temp;
    })
  );

  nav.querySelector(".del").disabled = notes.length == 1;
}

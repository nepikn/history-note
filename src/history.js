export function handleHistoryState(state, method) {
  history[method](state, "", getPageUrl(state.noteId));
}

export function getPageUrl(noteId) {
  const search = new URLSearchParams();
  search.set("id", noteId);
  return `?${search}`;
}

export function getUrlQueryNoteId(url = document.location) {
  return new URL(url).searchParams.get("id");
}

export function handleHistoryState(state, method) {
  history[method](state, "", getPageUrl(state.noteId));
}

export function getPageUrl(noteId) {
  const query = new URLSearchParams();
  query.set("id", noteId);
  return `?${query}`;
}

export function getUrlQueryNoteId(url = document.location) {
  return new URL(url).searchParams.get("id");
}

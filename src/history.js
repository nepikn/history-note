export function handleHistoryState(state, method) {
  history[method](state, "", getPageUrl(state.noteId));
}

export function getPageUrl(noteId) {
  const search = new URLSearchParams();
  search.append("id", noteId);
  return `${location.pathname}?${search}`;
}

export function getNoteId(url = document.location) {
  return new URL(url).searchParams.get("id");
}

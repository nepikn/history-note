export function handleHistoryState(state, method) {
  history[method](state, "", getPageUrl(state.noteId));
}

export function getPageUrl(noteId) {
  const search = new URLSearchParams();
  search.append("id", noteId);
  return `${import.meta.env.BASE_URL}?${search}`;
}

export function getNoteId(url = document.location) {
  return new URL(url).searchParams.get("id");
}

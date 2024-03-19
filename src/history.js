export function handleHistoryState(state, method) {
  history[method](state, "", getPageUrl(state.noteId));
}

export function getPageUrl(noteId) {
  const query = new URLSearchParams();
  const pathname = location.pathname;

  query.set("id", noteId);

  return `${pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}?${query}`;
}

export function getUrlQueryNoteId(url = document.location) {
  return new URL(url).searchParams.get("id");
}

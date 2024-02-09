export function handleHistoryState(state, method = "pushState") {
  history[method](state, "", `${import.meta.env.BASE_URL}/${state.noteId}`);
}

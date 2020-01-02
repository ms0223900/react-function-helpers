type Reducers<State> = {
  [name in keyof State]: (state: State, action: any) => State[name]
}
function combineReducers<State extends object>(reducers: Reducers<State>) {
  type Key = keyof State
  return (state: State, action: any): State => {
    let newState = state;
    const allReducers = Object.keys(reducers) as Key[];
    for (const reducer of allReducers) {
      newState = {
        ...newState,
        [reducer]: reducers[reducer](newState, action),
      };
    }
    return newState;
  };
}

export default combineReducers;
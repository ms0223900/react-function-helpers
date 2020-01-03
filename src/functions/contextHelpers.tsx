import { Obj } from "all-common-types";
import { createContext, useReducer } from "react";

type Dispatch = (x?: any) => any
type Reducers<State> = (state: State, action: any) => State
export interface MyContext<State> {
  dispatch: Dispatch
  state: State
}

export function createContextStore<State extends Obj>(
  initState: State, 
  dispatch: Dispatch=() => {
    // dispatch
  }
) {
  return createContext<MyContext<State>>({
    dispatch,
    state: initState
  });
}

export function createContextValueFn<State extends Obj>(
  initState: State, 
  reducers: Reducers<State>
) {
  return (customInitState?: Partial<State>, customDispatch?: Dispatch) => {
    const [state, dispatch] = useReducer(reducers, {
      ...initState,
      ...customInitState
    });
    return ({
      dispatch: customDispatch ? customDispatch : dispatch,
      state
    });
  };
}

export default {
  createContextStore,
  createContextValueFn
};
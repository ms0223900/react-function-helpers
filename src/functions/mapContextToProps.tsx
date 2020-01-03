import { Dispatch } from "react";

type StateObj = object
export type StateOrDispatch<Context extends Dispatch<any> | StateObj> = Context extends Dispatch<any> ? Dispatch<any> : Context

export type MapContextToProps<Context extends Dispatch<any> | StateObj, OwnProps, PropsFromContext> = (
  stateOrDispatch: Context,
  ownProps: OwnProps,
) => PropsFromContext

export type MapDispatchToProps<OwnProps, PropsFromDispatch> = MapContextToProps<Dispatch<any>, OwnProps, PropsFromDispatch>
export type MapStateToProps<State extends object, OwnProps, PropsFromState> = MapContextToProps<State, OwnProps, PropsFromState>

export function makePropsFromContext<State extends StateObj, C extends Dispatch<any> | State, O, P>(
  context: C,
  ownProps: O,
  mapContextToProps?: MapContextToProps<C, O, P>
) {
  let propsForDispatch = {} as P;
  if(mapContextToProps) {
    propsForDispatch = mapContextToProps(context, ownProps);
  }
  return propsForDispatch;
}

export default makePropsFromContext;

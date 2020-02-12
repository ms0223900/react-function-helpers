import { Callback } from 'all-common-types';
import React, { Dispatch, memo, useCallback, useContext } from 'react';
import { ComponentType, Context } from "react";
import makePropsFromContext, { MapDispatchToProps, MapStateToProps } from './mapContextToProps';

export type ContextStoreGeneric<State> = Context<{
  state: State
  dispatch: Dispatch<any>
}>

function useMemorizedDispatch<PropsFromDispatch extends {
  [x: string]: Callback
}>(dispatch: Callback, propsFromDispatch: PropsFromDispatch) {
  let result = propsFromDispatch;
  for (const prop of Object.keys(propsFromDispatch)) {
    const dispatchFn = propsFromDispatch[prop];
    const memoDispatch = useCallback(dispatchFn, [dispatch]);
    result = {
      ...result,
      [prop]: memoDispatch
    };
  } 
  return result;
}

function connectCtx<State extends object>(contextStore: ContextStoreGeneric<State>) {
  return function<OwnProps, PropsFromState, PropsFromDispatch extends {
    [x: string]: Callback | undefined
  }>(
    mapStateToProps?: MapStateToProps<State, OwnProps, PropsFromState>,
    mapDispatchToProps?: MapDispatchToProps<OwnProps, PropsFromDispatch>
  ) {
    type Props = OwnProps & PropsFromState & PropsFromDispatch
    return (Component: ComponentType<Props>) => {
      const MemoComponent = memo<ComponentType<Props>>(Component) as any as ComponentType<OwnProps>;
      return (props: OwnProps) => {
        const { state, dispatch } = useContext(contextStore);
        const propsFromState = makePropsFromContext(state, props, mapStateToProps);
        const propsFromDispatch = makePropsFromContext(dispatch, props, mapDispatchToProps);
        const dispatchUseCallback = useMemorizedDispatch(dispatch, propsFromDispatch as {
          [x: string]: Callback
        });
        return (
          <MemoComponent 
            {...props} 
            {...propsFromState}
            {...dispatchUseCallback} />
        );
      };
    };
  };
}

export default connectCtx;
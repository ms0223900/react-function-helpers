import React, { Dispatch, useContext } from 'react';
import { ComponentType, Context } from "react";
import makePropsFromContext, { MapDispatchToProps, MapStateToProps } from './mapContextToProps';

export type ContextStoreGeneric<State> = Context<{
  state: State
  dispatch: Dispatch<any>
}>

function connectCtx<State extends object>(contextStore: ContextStoreGeneric<State>) {
  return function mapCtxToProps<OwnProps, PropsFromState, PropsFromDispatch>(
    mapStateToProps?: MapStateToProps<State, OwnProps, PropsFromState>,
    mapDispatchToProps?: MapDispatchToProps<OwnProps, PropsFromDispatch>
  ) {
    type Props = OwnProps & PropsFromState & PropsFromDispatch
    return (Component: ComponentType<Props>) => {
      return (props: OwnProps) => {
        const { state, dispatch } = useContext(contextStore);
        const propsFromState = makePropsFromContext(state, props, mapStateToProps);
        const propsFromDispatch = makePropsFromContext(dispatch, props, mapDispatchToProps);
        return (
          <Component 
            {...props} 
            {...propsFromState}
            {...propsFromDispatch} />
        );
      };
    };
  };
}

export default connectCtx;
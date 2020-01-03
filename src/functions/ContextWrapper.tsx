import { Callback } from 'all-common-types';
import React, { Context, ReactNode } from 'react';

export interface ContextWrapperProps<ContextState> {
  customInitState?: Partial<ContextState>
  customDispatch?: Callback
  children: ReactNode
}
export type ContextValueFnType<ContextState> = (
  customInitState?: Partial<ContextState>,
  customDispatch?: Callback,
) => {
  dispatch: (x?: any) => any
  state: ContextState
}

export function ContextWrapperFn<ContextState>(
  ContextValueFn: ContextValueFnType<ContextState>,
  ContextStore: Context<{
    dispatch: (x?: any) => any
    state: ContextState
  }>
) {
  return (props: ContextWrapperProps<ContextState>) => {
    const { children, customInitState, customDispatch } = props;
    const value = ContextValueFn(customInitState, customDispatch);
    return (
      <ContextStore.Provider value={value}>
        {children}
      </ContextStore.Provider>
    );
  };
}

export default ContextWrapperFn;
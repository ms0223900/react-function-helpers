import { Obj } from 'all-common-types';
import React from 'react';

export function HookWrapper<HookProps extends any[] | Obj>(props: {
  hook: HookProps
}) {
  return (
    <></> 
  );
};
export function TestHookWrapper<HookFn extends (...args: any[]) => any[] | object>(hookFn: HookFn) {
  return (...hookArgs: Parameters<HookFn>) => () => {
    const hookStates = hookFn(...hookArgs);
    return (
      <HookWrapper hook={hookStates} />
    );
  };
}
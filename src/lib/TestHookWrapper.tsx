import React from 'react'
import { Obj } from 'all-common-types';

export function HookWrapper<HookProps extends any[] | Obj>(props: {
  hook: HookProps
}) {
  console.log(props.hook);
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
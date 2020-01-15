import { Obj } from 'all-common-types';
import React, { ChangeEvent, useRef } from 'react';
import { useState } from "react";

export const useSelectTab = (initIndex: number=0): 
[number, (e: any, value: number) => any] => {
  const [selectedTab, setSelect] = useState(initIndex);
  const handleTab = (e: any, value: number) => {
    setSelect(value);
  };
  return [selectedTab, handleTab];
};

type QueryFn = (value: string) => any 
type QueryFnForSearch = (name: any, value: string) => any
export function useMockQuery<Res extends {
  [x: string]: any
}>(
  initRes: Res[], 
  mockData: Res[],
  dataCompareKey: keyof Res,
): [Res[], QueryFn ] {
  const [query, getQuery] = useState<Res[]>(initRes);
  const findResult: QueryFn = (value) => {
    const mockQueryRes = !!value ? mockData.filter(res => {
      return res[dataCompareKey].includes(value);
    }) : [];
    return getQuery(mockQueryRes);
  };
  return [query, findResult];
};

export const useToggle = (initToggle: boolean=false) => {
  const [toggle, setToggle] = useState(initToggle);
  const handleToggle = () => {
    setToggle(t => !t);
  };
  return { toggle, setToggle, handleToggle };
};

export function useSearch<State extends {[x: string]: string}, K extends keyof State>(initState: State, queryFn?: QueryFnForSearch) {
  const [values, setValues] = useState<State>(initState);
  const setNameValues = (name: K, value: string) => {
    setValues(val => ({
      ...val,
      [name]: value,
    }));
    if(queryFn) {
      queryFn(name, value);
    }
  };

  const handleSetValues = (name: K) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValues(name, value);
  };

  const handleDirectlySetValues = (name: K) => (value: string) => {
    setNameValues(name, value);
  };

  return { values, setValues, handleSetValues, handleDirectlySetValues };
}

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
import React, { useRef, useCallback } from "react";
import { getClientPercent } from "./fn";
import { Callback } from "all-common-types";

const useDomRef = (callback?: Callback, valsForDetection=[] as any[]) => {
  const isClickedInRange = useRef(false);
  const domSpecRef = useRef<DOMRect>();
  const divRef = useRef<HTMLDivElement>(null);

  const handleSetIsClicked = useCallback((x: any) => {
    isClickedInRange.current = true;
    if(callback) {
      callback(x);
    }
  }, []);
  const handleSetIsNotClicked = useCallback(() => {
    isClickedInRange.current = false;
  }, []);

  React.useEffect(() => {
    if(divRef.current) {
      domSpecRef.current = divRef.current.getBoundingClientRect();
    }
    const getClientPercentFn = getClientPercent(domSpecRef.current);
    if(callback) {
      console.log(domSpecRef.current);
      const mouseMoveFn = (e: MouseEvent) => {
        isClickedInRange.current && getClientPercentFn(callback)(e);
      };
      window.addEventListener('mousemove', mouseMoveFn);
      return () => window.removeEventListener('mousemove', mouseMoveFn);
    }
  }, valsForDetection);

  React.useEffect(() => {
    const getClientPercentFn = getClientPercent(domSpecRef.current);
    const mouseDownFn = getClientPercentFn(handleSetIsClicked);

    window.addEventListener('mousedown', mouseDownFn);
    window.addEventListener('mouseup', handleSetIsNotClicked);
    return () => {
      window.removeEventListener('mousedown', mouseDownFn);
      window.removeEventListener('mouseup', handleSetIsNotClicked);
    };
  }, valsForDetection);

  return ({
    divRef,
    domSpecRef,
  });
};

export default useDomRef;
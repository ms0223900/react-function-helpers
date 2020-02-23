import React, { useRef } from "react";
import { getClientPercent } from "./fn";
import { Callback } from "all-common-types";

const useDomRef = (callback?: Callback) => {
  const isClickedInRange = useRef(false);
  const domSpecRef = useRef<DOMRect>();
  const divRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(divRef.current) {
      domSpecRef.current = divRef.current.getBoundingClientRect();
    }
    const getClientPercentFn = getClientPercent(domSpecRef.current);
    if(callback) {
      console.log(isClickedInRange.current);
      const mouseMoveFn = (e: MouseEvent) => {
        isClickedInRange.current && getClientPercentFn(callback)(e);
      };
      window.addEventListener('mousemove', mouseMoveFn);
      return () => window.removeEventListener('mousemove', mouseMoveFn);
    }
  }, []);

  React.useEffect(() => {
    const getClientPercentFn = getClientPercent(domSpecRef.current);
    const mouseDownFn = getClientPercentFn(() => {
      isClickedInRange.current = true;
    });
    window.addEventListener('mousedown', mouseDownFn);
    window.addEventListener('mouseup', () => {
      isClickedInRange.current = false;
    });
  }, []);

  return ({
    divRef,
    domSpecRef,
  });
};

export default useDomRef;
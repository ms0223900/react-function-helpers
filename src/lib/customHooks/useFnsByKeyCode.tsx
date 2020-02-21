import { Callback } from 'all-common-types';
import { useCallback, useEffect, useState, useRef } from "react";
import * as KEYCODE from '../../config';
import calNewIndex from '../../helperFns/calNewIndex';

type ConfirmOrEscape = typeof KEYCODE.ENTER | typeof KEYCODE.ESCAPE
type PlusOrMinusKeyCode = typeof KEYCODE.ARROW_UP | typeof KEYCODE.ARROW_DOWN

export class HandleFnsByKeyCode {
  public static confirmOrEscape = (confirmFn: Callback, escapeFn: Callback) => {
    return (keyCode: ConfirmOrEscape) => {
      if(keyCode === KEYCODE.ENTER) {
        confirmFn();
      }
      else if(keyCode === KEYCODE.ESCAPE) {
        escapeFn();
      }
    };
  };

  public static plusOrMinusIndex = (
    keyCode: PlusOrMinusKeyCode
  ) => {
    return keyCode === KEYCODE.ARROW_UP ? calNewIndex('-') : calNewIndex('+');
  }
}

export const useFnsByKeyCode = ({
  lastIndex, confirmFn, escapeFn
}: {
  lastIndex: number,
  confirmFn: Callback,
  escapeFn: Callback,
}) => {
  const confirmFnNow = useRef<Callback>();
  const [index, setIndex] = useState(0);
  // const [confirmFnNow, setConfirmFn] = useState(() => confirmFn);
  const HandleFnsByKeyCodeEvent = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e;
    switch (keyCode) {
      case KEYCODE.ENTER:
      case KEYCODE.ESCAPE: {
        confirmFnNow.current && 
        HandleFnsByKeyCode.confirmOrEscape(confirmFnNow.current, escapeFn)(keyCode);
        break;
      }
      case KEYCODE.ARROW_UP:
      case KEYCODE.ARROW_DOWN: {
        const calculatedIndex = HandleFnsByKeyCode.plusOrMinusIndex(keyCode)({
          lastIndex,
          indexNow: index
        });
        setIndex(calculatedIndex);
        break;
      } 
      default:
        break;
    }
  }, [confirmFnNow, escapeFn, lastIndex, index]);

  useEffect(() => {
    confirmFnNow.current = confirmFn;
  }, [confirmFn]);

  useEffect(() => {
    window.addEventListener('keydown', HandleFnsByKeyCodeEvent);
    return () => {
      window.removeEventListener('keydown', HandleFnsByKeyCodeEvent);
    };
  }, [HandleFnsByKeyCodeEvent]);
  
  return ({
    index,
    // setConfirmFn
  });
};
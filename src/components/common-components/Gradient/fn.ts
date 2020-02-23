import { Callback } from "all-common-types";

export const checkPercentIsInRange = (percent: number) => (
  (percent) >= 0 && (percent) <= 1
);

export const regularizeNumberToDigit2 = (num: number, digit=2) => (
  // ~~(num * 10000) / 10000
  Number.parseFloat(num.toFixed(digit))
);

export const regularizePercent = (percent: number) => {
  const rawPercent = regularizeNumberToDigit2(percent * 100);
  return rawPercent;
};

export const getRectClientPercentX = (domRect: DOMRect, clientX: number) => {
  const {
    x, width,
  } = domRect;
  const distanceX = clientX - x;
  const rawPercent = distanceX / width;
  return rawPercent;
};

export const getRectClientPercentY = (domRect: DOMRect, clientY: number) => {
  const {
    y, height,
  } = domRect;
  const distanceY = clientY - y;
  const rawPercent = distanceY / height;
  return rawPercent;
};

export const getClientPercent = (domSpec: DOMRect | undefined) => (cb?: Callback) => (e: MouseEvent) => {
  // console.log(domSpec);
  if(domSpec) {
    const { clientX, clientY } = e;
    const percentX = getRectClientPercentX(domSpec, clientX);
    const percentY = getRectClientPercentY(domSpec, clientY);
    const isInRange = 
      checkPercentIsInRange(percentY) && 
      checkPercentIsInRange(percentX);
    const res = ({
      percentX: regularizePercent(percentX),
      percentY: regularizePercent(percentY),
    });
    if(cb && isInRange) {
      cb(res);
      return res;
    }
  }
  return null;
};
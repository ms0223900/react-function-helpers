import { Color } from "@material-ui/core";


export const ITEM_WIDTH = 36;
export const PICKER_TOOL_WIDTH = ITEM_WIDTH * 4;
// 0-13
export type ColorShades = (keyof Color)[]
export const colorShades: ColorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A400', 'A700'];
export const defaultColorShadeIndex = 5;
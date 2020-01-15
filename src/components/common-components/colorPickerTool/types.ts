import { Theme } from "@material-ui/core";

export type PaletteKeys = keyof Theme['palette']
export interface ThemeCustomizableColors {
  primary?: string, 
  secondary?: string,
}

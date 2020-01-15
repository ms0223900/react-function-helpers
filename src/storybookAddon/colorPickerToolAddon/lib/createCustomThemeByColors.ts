import { createMuiTheme, Theme } from "@material-ui/core";

export interface ThemeCustomizableColors {
  primary?: string, 
  secondary?: string,
}

export const getCustomColor = (originColor: string, newColor: string | undefined) => (
  newColor ? newColor : originColor
);

const createCustomThemeByColors = (defaultTheme: Theme, {
  primary, secondary
}: ThemeCustomizableColors) => createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: getCustomColor(defaultTheme.palette.primary.main, primary)
    },
    secondary: {
      main: getCustomColor(defaultTheme.palette.secondary.main, secondary)
    }
  },
});

export default createCustomThemeByColors;
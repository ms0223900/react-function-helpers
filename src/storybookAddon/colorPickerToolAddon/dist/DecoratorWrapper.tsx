import { createMuiTheme, Theme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { ReactChild, useCallback, useEffect, useState } from 'react';
import createCustomThemeByColors, { ThemeCustomizableColors } from '../lib/createCustomThemeByColors';
import { connectToChannelAndDisconnect, MessageSetTheme } from '../lib/fn';
import { EVENT_SET_THEME } from './config';


export interface DecoratorWrapperProps {
  defaultTheme?: Theme
  children: ReactChild
}
const DecoratorWrapper = ({
  defaultTheme=createMuiTheme(), children
}: DecoratorWrapperProps) => {
  const [themeColors, setThemeColors] = useState<ThemeCustomizableColors>({});
  const handleSetThemeColorsFromPanel = useCallback((mes: MessageSetTheme) => {
    setThemeColors(mes.themeColors);
  }, []);
  useEffect(() => {
    connectToChannelAndDisconnect(EVENT_SET_THEME, handleSetThemeColorsFromPanel);
  }, []);
  const customTheme = createCustomThemeByColors(defaultTheme, themeColors);
  return (
    <ThemeProvider theme={customTheme}>
      {children}
    </ThemeProvider>
  );
};

export default DecoratorWrapper;
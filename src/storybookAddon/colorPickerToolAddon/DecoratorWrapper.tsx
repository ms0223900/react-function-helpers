import { createMuiTheme, Theme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { StoryGetter } from '@storybook/addons';
import { Callback } from 'all-common-types';
import React, { useEffect, useState } from 'react';
import { EVENT_SET_THEME } from './config';
import createCustomThemeByColors, { ThemeCustomizableColors } from './lib/createCustomThemeByColors';
import { connectToChannelAndDisconnect, MessageSetTheme } from './lib/fn';


export interface DecoratorWrapperProps {
  defaultTheme?: Theme
  childrenFn: Callback
}
const DecoratorWrapper = ({
  defaultTheme=createMuiTheme(), childrenFn
}: DecoratorWrapperProps) => {
  const [themeColors, setThemeColors] = useState<ThemeCustomizableColors>({});
  const handleSetThemeColorsFromPanel = (mes: MessageSetTheme) => {
    setThemeColors(mes.themeColors);
  };
  useEffect(() => {
    connectToChannelAndDisconnect(EVENT_SET_THEME, handleSetThemeColorsFromPanel);
  }, []);
  const customTheme = createCustomThemeByColors(defaultTheme, themeColors);
  return (
    <ThemeProvider theme={customTheme}>
      {childrenFn()}
    </ThemeProvider>
  );
};

export default DecoratorWrapper;
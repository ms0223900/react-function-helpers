import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import createCustomThemeByColors, { ThemeCustomizableColors } from 'storybookAddon/colorPickerToolAddon/lib/createCustomThemeByColors';
import { EVENT_SET_THEME } from './config';
import { connectToChannelAndDisconnect, MESSAGE_SET_THEME } from './lib/fn';
import { StoryGetter } from '@storybook/addons';
import { Callback } from 'all-common-types';
import { Theme, createMuiTheme } from '@material-ui/core';


export interface DecoratorWrapperProps {
  defaultTheme?: Theme
  childrenFn: Callback
}
const DecoratorWrapper = ({
  defaultTheme=createMuiTheme(), childrenFn
}: DecoratorWrapperProps) => {
  const [themeColors, setThemeColors] = useState<ThemeCustomizableColors>({});
  const handleSetThemeColorsFromPanel = (mes: MESSAGE_SET_THEME) => {
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
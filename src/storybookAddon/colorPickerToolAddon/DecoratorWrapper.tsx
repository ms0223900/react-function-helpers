import React, { useState, useEffect } from 'react';
import { connectToChannelAndDisconnect } from './lib/fn';
import { EVENT_SET_THEME } from './config';
import createCustomThemeByColors from 'theme/createCustomThemeByColors';
import { ThemeProvider } from '@material-ui/styles';

const DecoratorWrapper = ({
  childrenFn
}) => {
  const [themeColors, setThemeColors] = useState({});
  const handleSetThemeColorsFromPanel = (mes) => {
    setThemeColors(mes.themeColors);
  };
  useEffect(() => {
    connectToChannelAndDisconnect(EVENT_SET_THEME, handleSetThemeColorsFromPanel);
  });
  const customTheme = createCustomThemeByColors(themeColors);
  return (
    <ThemeProvider theme={customTheme}>
      {childrenFn()}
    </ThemeProvider>
  );
};

export default DecoratorWrapper;
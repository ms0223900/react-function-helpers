import React from 'react';
import { useChannel } from '@storybook/api';
import ThemeColorsColorPickerToolWithTabsContainer from './colorPickerTool/ThemeColorsColorPickerToolWithTabsContainer';
import { setThemeColorsFn } from './lib/fn';

const Panel = () => {
  const emit = useChannel({});
  return (
    <>
      <ThemeColorsColorPickerToolWithTabsContainer 
        setThemeColorsFn={setThemeColorsFn(emit)} />
    </>
  );
};

export default Panel;
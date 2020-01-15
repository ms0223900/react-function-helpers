import { useChannel } from '@storybook/api';
import React, { useCallback } from 'react';
import { MaterialUIColorPickerTool } from 'index';
import { setThemeColorsFn } from './lib/fn';

const Panel = () => {
  const emit = useChannel({});
  const handleSetThemeColors = useCallback(setThemeColorsFn(emit), []);
  return (
    <>
      <MaterialUIColorPickerTool 
        setThemeColorsFn={handleSetThemeColors} />
    </>
  );
};

export default Panel;
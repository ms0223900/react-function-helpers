import React from 'react';

import { Typography, createMuiTheme } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
// import withColorPicker from 'react-function-helpers/lib/storybookAddon/colorPickerToolAddon';
import { withColorPickerTool } from 'react-function-helpers/lib';
import { PARAMETER_ID } from 'react-function-helpers/lib/storybookAddon/colorPickerToolAddon/dist/config';
import { ColorPickerTool } from '../components/common-components';

const testTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#d0a'
    }
  }
});

export default {
  title: 'Button',
  component: Button,
  decorators: [withColorPickerTool],
  parameters: {
    [PARAMETER_ID]: {
      defaultTheme: testTheme
    }
  }
};

export const TypographyInTheme = () => (
  <>
    <Typography variant={'h1'} color={'primary'}>{'H1'}</Typography>
    <Typography variant={'h2'} color={'secondary'}>{'H2'}</Typography>
  </>
);

export const CPT = () => (
  <ColorPickerTool />
);
CPT.story = {
  name: 'Color Picker Tool',
};

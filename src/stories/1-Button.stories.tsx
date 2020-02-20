import React from 'react';

import { Typography, createMuiTheme } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { ColorPickerTool } from '../components/common-components';
import { PARAMETER_ID } from '../storybookAddon/colorPickerToolAddon/dist/config';
import withColorPickerTool from '../storybookAddon/colorPickerToolAddon/dist/index';

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

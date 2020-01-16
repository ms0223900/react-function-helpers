import React from 'react';

import { Typography } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import withColorPicker from 'react-function-helpers/lib/storybookAddon/colorPickerToolAddon';

export default {
  title: 'Button',
  component: Button,
  decorators: [withColorPicker]
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const TypographyInTheme = () => (
  <>
    <Typography variant={'h1'} color={'primary'}>{'H1'}</Typography>
    <Typography variant={'h2'} color={'secondary'}>{'H2'}</Typography>
  </>
);

Emoji.story = {
  name: 'with emoji',
};

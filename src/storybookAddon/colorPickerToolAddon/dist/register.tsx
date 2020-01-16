import addons from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import { ADDON_ID, PANEL_ID } from './config';
import Panel from './Panel';

// Register the addon with a unique name.
const register = () => addons.register(ADDON_ID, () => {
  // Also need to set a unique name to the panel.
  addons.addPanel(PANEL_ID, {
    title: ADDON_ID,
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <Panel />
      </AddonPanel>
    ),
  });
});

export default register;


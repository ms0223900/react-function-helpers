import React from 'react';
import addons from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import Panel from './Panel';
import { ADDON_ID, PANEL_ID } from './config';

// Register the addon with a unique name.
addons.register(ADDON_ID, () => {
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

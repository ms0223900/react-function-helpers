import addons from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import { ADDON_ID, PANEL_ID } from './config';
import Panel from './Panel';
// Register the addon with a unique name.
addons.register(ADDON_ID, function () {
    // Also need to set a unique name to the panel.
    addons.addPanel(PANEL_ID, {
        title: ADDON_ID,
        render: function (_a) {
            var active = _a.active, key = _a.key;
            return (React.createElement(AddonPanel, { key: key, active: active },
                React.createElement(Panel, null)));
        },
    });
});

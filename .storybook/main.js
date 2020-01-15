module.exports = {
  stories: ['../src/stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions', 
    '@storybook/addon-links',
    'colorPickerToolAddon/register.js'
  ],
  webpackFinal: async config => {
    // do mutation to the config
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
        },
        // Optional
        // {
        //   loader: require.resolve('react-docgen-typescript-loader'),
        // },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};

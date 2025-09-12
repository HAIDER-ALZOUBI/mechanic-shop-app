// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // keep only reanimated while things stabilize
      'react-native-reanimated/plugin', // must be last
    ],
  };
};

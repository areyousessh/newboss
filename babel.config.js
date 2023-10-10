module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [['nativewind/babel'], 
              ['module-resolver', {
                root: '.',
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.jsx', '.ios.js', '.ios.jsx'],
                alias: {
                  '@components': './src/components',
                  '@assets': './src/assets',
                  '@context': './src/context',
                  '@pages': './src/pages',
                  '@routes': './src/routes',
                }
              }]
  ]
  };
};

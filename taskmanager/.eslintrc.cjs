module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      configFile: "path/to/config.js",
    },
  },
  plugins: ['babel', 'react'],
  env: {
    node: true, // Ajoutez cette ligne pour activer les globales Node.js
  },
  extends: ['eslint:recommended', 
    'plugin:react/recommended',
    'plugin:babel/recommended',
    'plugin:@next/next/recommended',
    "next/core-web-vitals", "prettier"],
  rules: {
    // Vos règles personnalisées
  },
};
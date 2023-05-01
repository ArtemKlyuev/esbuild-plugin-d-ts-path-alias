module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  // '*.{js,jsx,ts,tsx}': () => 'tsc -p tsconfig.json --noEmit',
};

module.exports = {
  extends: 'airbnb-base',
  rules: {
    'import/no-extraneous-dependencies': 1,
    semi: 0,
    'no-continue': 1,
  },
  globals: {
    describe: Function,
    it: Function,
    test: Function,
  },
};

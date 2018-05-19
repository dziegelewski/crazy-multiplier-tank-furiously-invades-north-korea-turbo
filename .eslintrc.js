// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  globals: {
    'VERSION': false
  },
  // add your custom rules here
  rules: {
    'no-mixed-operators': 0,
    'no-restricted-syntax': 0,
    'no-inner-declarations': 0,
    'no-await-in-loop': 0,
    'no-return-assign': 0,
    'no-mixed-spaces-and-tabs': 0,
    'import/prefer-default-export': 0,
    'no-prototype-builtins': 0,
    'no-plusplus': 0,
    'no-tabs': 0,
    'indent': 0,
    'import/no-dynamic-require': 0,
    'quotes': 0,
    'global-require': 0,
    'class-methods-use-this': 0,
    "no-use-before-define": ["error", { "functions": false }],
    'no-unused-expressions': ['error', {
      "allowTernary": true,
      "allowShortCircuit": true,
    }],
    'no-confusing-arrow': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'no-param-reassign': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

# If you are `power-assert` user

\1. install `power-assert` and `espower-loader`

```
$ npm install beater beater-cli -D
$ npm install power-assert espower-loader -D
```

\2. write script for `--require`

```js
// scripts/enable-power-assert.js
require('espower-loader')({
  cwd: process.cwd(),
  pattern: 'test/**/*.js'
});
```

\3. run tests with `--require`

```
$ beater --require ./scripts/enable-power-assert.js
```

or

```js
// package.json
{
  "beater": {
    "require": [
      "./scripts/enable-power-assert.js"
    ]
  }
}
```

# If you are `babel` and `power-assert`

\1. install `babel-register` and `babel-preset-power-assert`

```
$ npm install beater -D
$ npm install babel-register babel-preset-power-assert -D
```

\2. write your `.babelrc`

```json
{
  "presets": [
    "babel-preset-power-assert"
  ]
}
```

\3. write script for `--require`

```js
// scripts/enable-babel.js
require('babel-register')({
  ignore: (file) => file.match(/node_modules/) ? true : false
});
```

\4. run tests with `--require`

```
$ eater --require ./scripts/enable-babel.js
```

or

```js
// package.json
{
  "beater": {
    "require": [
      "./scripts/enable-babel.js"
    ]
  }
}
```

# If you are `babel` (JSX) user

\1. install `babel-register`

```
$ npm install beater -D
$ npm install babel-register -D
```

\2. write script for `--require`

```js
// scripts/enable-jsx.js
require('babel-register')({
  ignore: (file) => file.match(/node_modules/) ? true : false
});
```

\3. run tests with `--require`

```
$ beater --require ./scripts/enable-jsx.js
```

or

```js
// package.json
{
  "beater": {
    "require": [
      "./scripts/enable-jsx.js"
    ]
  }
}
```

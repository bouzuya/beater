# `Beater` (api) example

```js
import { Beater } from 'beater';

const beater = new Beater({
  dir: 'test/',
  ext: '.js',
  procs: 10,
  reporter: 'beater-reporter-tap',
  require: [
    './enable-power-assert.js',
    './enable-jsx.js'
  ]
});
beater.start();
```

![beater logo][beater-logo]

beater: **b**ouzuya's **ea**sy **t**est runn**er**. beater is inspired by [eater][yosuke-furukawa/eater].

Twitter hashtag is [#beaterjs](https://twitter.com/hashtag/beaterjs).

[yosuke-furukawa/eater]: https://github.com/yosuke-furukawa/eater
[beater-logo]: https://cloud.githubusercontent.com/assets/1221346/15892977/e69386f0-2db7-11e6-9163-bcb2f2471581.png

## Features

- Simple API: `test()` and `fixture()`. `assert` is not included.
- Browser support: use any module bundler. browserify etc...
- Node.js support: `beater-cli` run tests by multi-process.
- TypeScript support: `*.d.ts` is included.

## Usage

### for Node.js

#### 1. Install

```
$ npm install beater beater-cli
```

#### 2. Write test

```js
// test/helper.js
const { test, fixture } = require('beater').default();
module.exports = { test, fixture };
```

```js
// test/foo.js
const assert = require('assert');
const { test, fixture } = require('./helper');

test('simple test', () => {
  assert(1 + 1 === 20); // fail
});

test('async test', () => {
  return new Promise(resolve => {
    assert(1 + 1 === 200); // fail
    resolve();
  });
});

const before = () => 3;
const after = context => {};
test('before/after', fixture({ before, after }, context => {
  assert(context === 3); // ok
}));
```

#### 3. Run

```
$ $(npm bin)/beater
```

### for Browser

#### 1. Install

```
$ npm install beater beater-html-reporter browserify
```

#### 2. Write test

```ts
// test/helper.js
const reporter = require('beater-html-reporter').default;
const { test, fixture } = require('beater').default(reporter());
module.exports = { test, fixture };
```

```ts
// test/foo.js
const assert = require('assert');
const { test, fixture } = require('./helper');

test('simple test', () => {
  assert(1 + 1 === 20); // fail
});

test('async test', () => {
  return new Promise(resolve => {
    assert(1 + 1 === 200); // fail
    resolve();
  });
});

const before = () => 3;
const after = context => {};
test('before/after', fixture({ before, after }, context => {
  assert(context === 3); // ok
}));
```

```
// index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>beater test</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

#### 3. Run

```
$ $(npm bin)/browserify test/foo.js -o bundle.js
$ open index.html
```

## Documents

See [doc/](doc/README.md) or [examples/](examples/).

## Related Packages

- [bouzuya/beater-cli][] ... A command-line interface for beater.
- [bouzuya/beater-cli-reporter][] ... beater-cli default reporter.
- [bouzuya/beater-reporter][] ... beater reporter interface.

[bouzuya/beater-cli]: https://github.com/bouzuya/beater-cli
[bouzuya/beater-cli-reporter]: https://github.com/bouzuya/beater-cli-reporter
[bouzuya/beater-reporter]: https://github.com/bouzuya/beater-reporter

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Circle CI][circleci-badge-url]][circleci-url]

[npm-badge-url]: https://badge.fury.io/js/beater.svg
[npm-url]: https://www.npmjs.com/package/beater
[circleci-badge-url]: https://circleci.com/gh/bouzuya/beater.svg?style=svg
[circleci-url]: https://circleci.com/gh/bouzuya/beater

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net

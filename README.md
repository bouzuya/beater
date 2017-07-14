![beater logo][beater-logo]

beater: **b**ouzuya's **ea**sy **t**est runn**er**. beater is inspired by [eater][yosuke-furukawa/eater].

Twitter hashtag is [#beaterjs](https://twitter.com/hashtag/beaterjs).

[yosuke-furukawa/eater]: https://github.com/yosuke-furukawa/eater
[beater-logo]: https://cloud.githubusercontent.com/assets/1221346/15892977/e69386f0-2db7-11e6-9163-bcb2f2471581.png

## Features

- Simple API: `test()`, `fixture()`, and `run()` only. `assert` is not included.
- TypeScript support: `*.d.ts` is included.

## Usage

### 1. Install

```
$ npm install beater
```

### 2. Write test

```typescript
// test/index.js
const assert = require('assert');
const { fixture, run, test } = require('beater');

const test1 = test('simple test', () => {
  assert(1 + 1 === 20); // fail
});

const test2 = test('async test', () => {
  return new Promise((resolve) => {
    assert(1 + 1 === 200); // fail
    resolve();
  });
});

const before = () => 3;
const after = context => {};
const test3 = test('before/after', fixture({ before, after }, (context) => {
  assert(context === 3); // ok
}));

run([test1, test2, test3]);
```

### 3. Run

```
$ node test/index.js
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
[![Travis CI][travisci-badge-url]][travisci-url]

[npm-badge-url]: https://badge.fury.io/js/beater.svg
[npm-url]: https://www.npmjs.com/package/beater
[travisci-badge-url]: https://travis-ci.org/bouzuya/beater.svg?branch=master
[travisci-url]: https://travis-ci.org/bouzuya/beater

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net

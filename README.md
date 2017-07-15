![beater logo][beater-logo]

beater: **b**ouzuya's **ea**sy **t**est runn**er**. beater is inspired by [eater][yosuke-furukawa/eater].

Twitter hashtag is [#beaterjs](https://twitter.com/hashtag/beaterjs).

[yosuke-furukawa/eater]: https://github.com/yosuke-furukawa/eater
[beater-logo]: https://cloud.githubusercontent.com/assets/1221346/15892977/e69386f0-2db7-11e6-9163-bcb2f2471581.png

## Features

- Only 3 functions:
  1. `test()`
  2. `run()`
  3. `runWithOptions()`
- You can use your favorite `assert()`.
- You can use your favorite reporter.
- You can use TypeScript (2.x `*.d.ts` is included).

## Usage

### 1. Install

```
$ npm install beater
```

### 2. Write test

```js
// test/index.js
const assert = require('assert');
const { run, test } = require('beater');

const test1 = test('simple test', () => {
  assert(1 + 1 === 20); // fail
});

const test2 = test('async test', () => {
  return new Promise((resolve) => {
    assert(1 + 1 === 200); // fail
    resolve();
  });
});

run([test1, test2]).catch(() => process.exit(1));
```

### 3. Run

```
$ node test/index.js
```

## Related Packages

- [bouzuya/beater-reporter][] ... beater reporter interface.
- [bouzuya/beater-tap-reporter][] ... beater TAP reporter.
- <del>[bouzuya/beater-cli][] ... DEPRECATED. A command-line interface for beater. </del>
- <del>[bouzuya/beater-cli-reporter][] ... DEPRECATED. beater-cli default reporter.</del>

[bouzuya/beater-cli]: https://github.com/bouzuya/beater-cli
[bouzuya/beater-cli-reporter]: https://github.com/bouzuya/beater-cli-reporter
[bouzuya/beater-reporter]: https://github.com/bouzuya/beater-reporter
[bouzuya/beater-tap-reporter]: https://github.com/bouzuya/beater-tap-reporter

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

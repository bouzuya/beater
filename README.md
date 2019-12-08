![beater logo][beater-logo]

beater: **b**ouzuya's **ea**sy **t**est runn**er**. beater is inspired by [eater][yosuke-furukawa/eater].

[yosuke-furukawa/eater]: https://github.com/yosuke-furukawa/eater
[beater-logo]: https://cloud.githubusercontent.com/assets/1221346/15892977/e69386f0-2db7-11e6-9163-bcb2f2471581.png

## Features

- Only 2 functions:
  - `run()`
  - `runWithOptions()`
- You can use your favorite `assert()`.
- You can use your favorite reporter.
- You can use TypeScript (3.x `*.d.ts` is included).

## Usage

### 1. Install

```
$ npm install --save-dev beater
```

### 2. Write test

```js
// test/index.js
const assert = require('assert');
const { run } = require('beater');

const test1 = function simple_test() {
  assert(1 === 1);
};

const test2 = function promise_test() {
  return new Promise((resolve) => {
    assert(1 === 1);
    resolve();
  });
};

const test3 = async function async_fn_test() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert(1 === 1);
};

run([test1, test2, test3]).catch(() => process.exit(1));
```

### 3. Run

```
$ node test/index.js
TAP version 13
1..3
ok 1 - simple_test
ok 2 - promise_test
ok 3 - async_fn_test
```

## Related Packages

- [bouzuya/beater-helpers][] ... beater helper functions.
- [bouzuya/beater-reporter][] ... beater reporter interface.
- [bouzuya/beater-tap-reporter][] ... beater TAP reporter (default reporter) .
  - You can pipe to [any TAP reporter](https://github.com/sindresorhus/awesome-tap#reporters).
  - e.g. `$ node test/index.js | tap-dot`
- [bouzuya/create-beater-index][] ... beater index generator.
- [bouzuya/beater-double][] ... beater test double functions (alpha) .
- [bouzuya/beater-snapshot][] ... beater snapshot testing functions (alpha) .
- <del>[bouzuya/beater-cli][] ... DEPRECATED. A command-line interface for beater. </del>
- <del>[bouzuya/beater-cli-reporter][] ... DEPRECATED. beater-cli default reporter.</del>

[bouzuya/beater-cli-reporter]: https://github.com/bouzuya/beater-cli-reporter
[bouzuya/beater-cli]: https://github.com/bouzuya/beater-cli
[bouzuya/beater-double]: https://github.com/bouzuya/beater-double
[bouzuya/beater-helpers]: https://github.com/bouzuya/beater-helpers
[bouzuya/beater-reporter]: https://github.com/bouzuya/beater-reporter
[bouzuya/beater-snapshot]: https://github.com/bouzuya/beater-snapshot
[bouzuya/beater-tap-reporter]: https://github.com/bouzuya/beater-tap-reporter
[bouzuya/create-beater-index]: https://github.com/bouzuya/create-beater-index

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Travis CI][travis-ci-badge-url]][travis-ci-url]

[npm-badge-url]: https://img.shields.io/npm/v/beater
[npm-url]: https://www.npmjs.com/package/beater
[travis-ci-badge-url]: https://img.shields.io/travis/bouzuya/beater
[travis-ci-url]: https://travis-ci.org/bouzuya/beater

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([https://bouzuya.net/][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: https://bouzuya.net/

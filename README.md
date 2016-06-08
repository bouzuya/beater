# beater (beta)

![beater logo][beater-logo]

**b**ouzuya's **ea**sy **t**est runn**er**. beater is inspired by [eater][yosuke-furukawa/eater].

I highly recommend the original eater ([yosuke-furukawa/eater][]).

[yosuke-furukawa/eater]: https://github.com/yosuke-furukawa/eater
[beater-logo]: https://cloud.githubusercontent.com/assets/1221346/15892977/e69386f0-2db7-11e6-9163-bcb2f2471581.png

## Features

- Multi-process: See [eater][yosuke-furukawa/eater]'s document.
- Happy async: See [eater][yosuke-furukawa/eater]'s document.
- Require `test()`: You must use `test()`. It is the most biggest difference between eater and beater.
- Promise support: You can use a `Promise`. `done()` and `fail()` is removed.
- TypeScript support: `*.d.ts` is included.
- Reporter improved: A custom reporters can control the all runner's output.

## Installation

```
$ npm install beater
```

## Usage

```ts
import * as assert from 'assert';
import { test } from 'beater';

test('sync test', () => {
  assert(1 + 1 === 20); // fail
});

test('async test', () => {
  return new Promise(resolve => {
    assert(1 + 1 === 200); // fail
    resolve();
  });
});
```

## Badges

[![Circle CI][circleci-badge-url]][circleci-url]

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
[circleci-badge-url]: https://circleci.com/gh/bouzuya/beater.svg?style=svg
[circleci-url]: https://circleci.com/gh/bouzuya/beater

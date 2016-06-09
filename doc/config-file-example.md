# `package.json` and `.beaterrc` (config file) examples

beater can parse `JSON` only. beater cann't parse JSON5 file.

## `package.json`

```js
{
  "name": "beater-demo",
  "version": "1.0.0",
  "scripts": {
    "test": "beater"
  },
  "eater": {
    "dir": "test/",
    "ext": ".js",
    "procs": 10,
    "reporter": "beater-reporter-tap"
    "require": [
      "./enable-power-assert.js",
      "./enable-jsx.js"
    ]
  }
}
```

## `.beaterrc`

```js
{
  "dir": "test/",
  "ext": ".js",
  "procs": 10,
  "reporter": "beater-reporter-tap"
  "require": [
    "./enable-power-assert.js",
    "./enable-jsx.js"
  ]
}
```

## Note

You can use `files` instead of `dir` and `ext`.

```js
{
  "files": [
    "test/lib/foo.js",
    "test/lib/bar.js"
  ],
  "procs": 10,
  "reporter": "beater-reporter-tap"
  "require": [
    "./enable-power-assert.js",
    "./enable-jsx.js"
  ]
}
```
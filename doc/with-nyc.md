# If you are `nyc` user

\1. install `nyc`

```
$ npm install beater -D
$ npm install nyc -D
```

\2. run tests with `nyc`

```
$ nyc beater
```

or

```js
// package.json
{
  "scripts": {
    "test": "nyc beater"
  }
}
```

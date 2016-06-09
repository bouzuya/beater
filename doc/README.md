# beater documents

## `test()` and `fixture()`

See: [README](README.md).

### `test()`

```
test<T>(name: string, test: () => T | Promise<T>): void
```

### `fixture()`

```
fixture<T, U>(
  options: {
    before?: () => T | Promise<T>;
    after?: (context?: T, result?: U) => void | Promise<void>;
  },
  test: (context?: T) => U | Promise<U>
): () => Promise<void>
```

## options

- `beater` (command-line) options
    - `CommandLineOptions` in [`../src/options.ts`](../src/options.ts).
    - `beater --help`
- `package.json` and `.beaterrc` (config file) options
    - `ConfigFileOptions` & `CommandLineOptions` in [`../src/options.ts`](../src/options.ts).
    - [`package.json` and `.beaterrc` examples](config-file-example.md)
- `Beater` (api) options
    - `Options` in [`../src/options.ts`](../src/options.ts).
    - [`Beater` example](api-example.md)

## recipes

- [`beater` with `babel` (JSX)](with-jsx.md)
- [`beater` with `babel` & `power-assert`](with-babel-and-power-assert.md)
- [`beater` with `power-assert`](with-power-assert.md)
- [`beater` with `nyc` (coverage)](with-nyc.md)

const fixture = <T, U>(
  options: {
    before?: () => T | Promise<T>;
    after?: (context?: T, result?: U) => void | Promise<void>;
  },
  test: (context?: T) => U | Promise<U>
): () => Promise<void> => {
  const before = options.before ? options.before : (): T => void 0;
  const after = options.after ? options.after : (): void => void 0;
  return () => {
    return Promise
      .resolve()
      .then(before)
      .then(context => {
        return Promise
          .resolve(context)
          .then(test)
          .then(result => {
            return Promise
              .resolve()
              .then(() => after(context, result)); // through after error
          }, error => {
            return Promise
              .resolve()
              .then(() => after(context, void 0))
              .then(() => Promise.reject(error)); // through after error
          });
      });
  };
};

export { fixture };

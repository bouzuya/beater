const test = (name: string, fn: Function): Function => {
  Object.defineProperty(fn, 'name', {
    configurable: false,
    enumerable: true,
    value: name,
    writable: false
  });
  return fn;
};

export { test };

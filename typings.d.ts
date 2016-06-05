declare module "eater/runner" {
  const test: (
    message: string,
    test: (
      resolve: () => void,
      reject: (reason?: any) => void
    ) => void
  ) => void;
  export { test };
}

declare module "colo" {
  const red: (s: string) => any;
  const green: (s: string) => any;
  export { red, green };
}

declare module "set-blocking" {
  function setBlocking(blocking: boolean): void;
  namespace setBlocking {}
  export = setBlocking;
}

declare module "exists-sync" {
  function existsSync(path: string): boolean;
  namespace existsSync {}
  export = existsSync;
}

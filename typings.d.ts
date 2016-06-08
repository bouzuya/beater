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

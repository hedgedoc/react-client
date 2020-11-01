declare module 'workerize-loader!*' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AnyFunction = (...args: any[]) => any;
  type Async<F extends AnyFunction> = (
    ...args: Parameters<F>
  ) => Promise<ReturnType<F>>;

  export type Workerized<T> = Worker &
    { [K in keyof T]: T[K] extends AnyFunction ? Async<T[K]> : never };

  function createInstance<T>(): Workerized<T>;
  export = createInstance;
}

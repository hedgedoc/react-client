declare module 'workerize-loader!*' {
  type AnyFunction = (...args: any[]) => any;
  type Async<F extends AnyFunction> = (
    ...args: Parameters<F>
  ) => Promise<ReturnType<F>>;

  type Workerized<T> = Worker &
    { [K in keyof T]: T[K] extends AnyFunction ? Async<T[K]> : never };

  function createInstance<T>(): Workerized<T>;
  export = createInstance;
}

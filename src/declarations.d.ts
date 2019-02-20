declare type FluxFields<P, E, M> = { payload?: P; error?: E; meta?: M };

type ActionCreator = (
  ...args: any[]
) => { type: string } & FluxFields<any, any, any>;

declare type Action<C extends ActionCreator> = ReturnType<C>;
declare type Reducer<S, C extends ActionCreator> = (
  state: S | undefined,
  action: Action<C> | { type: "X" }
) => S;

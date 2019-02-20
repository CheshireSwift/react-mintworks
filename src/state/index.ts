import { combineReducers, Reducer } from 'redux';

export const rootReducer = combineReducers({});

export type ReducerState<R> = R extends Reducer<infer S> ? S : null;
export type State = ReducerState<typeof rootReducer>;
export default State;

import { combineReducers, Reducer } from 'redux';

// TODO
type Card = string;

// Done?
type Neighborhood = {
  mints: number;
  cards: Card[];
  buildings: Card[];
};

type LocationName =
  // | 'CROWDER'
  // | 'SWAPPER'
  // | 'RECYCLER'
  // | 'TEMPER'
  'WHOLESALER' | 'LOTTO' | 'BUILDER' | 'PRODUCER' | 'COUNCIL' | 'SUPPLIER';
type Location = {
  id: LocationName;
  filledSpots: number;
};

// States
type CurrentPlayerState = number;

type NeighborhoodsState = {
  self: Neighborhood;
  opponent: Neighborhood;
};

type LocationsState = {
  [name in LocationName]: { active: boolean; filledSpots: number }
};

type PlansState = {
  supply: Card[];
  deck: Card[];
};

// Reducers
const currentPlayer: FluxReducer<CurrentPlayerState, any> = (
  state = 0,
  action
) => {
  return state;
};

const neighborhoods: FluxReducer<NeighborhoodsState, any> = (
  state = {
    self: { mints: 0, cards: [], buildings: [] },
    opponent: { mints: 0, cards: [], buildings: [] }
  },
  action
) => state;

const locations: FluxReducer<LocationsState, any> = (
  state = {
    WHOLESALER: { active: false, filledSpots: 0 },
    LOTTO: { active: false, filledSpots: 0 },
    BUILDER: { active: true, filledSpots: 0 },
    PRODUCER: { active: true, filledSpots: 0 },
    COUNCIL: { active: true, filledSpots: 0 },
    SUPPLIER: { active: true, filledSpots: 0 }
  },
  action
) => state;

const plans: FluxReducer<PlansState, any> = (
  state = { supply: [], deck: [] },
  action
) => state;

export const rootReducer = combineReducers({
  currentPlayer,
  neighborhoods,
  locations,
  plans
});

export type ReducerState<R> = R extends Reducer<infer S> ? S : null;
export type State = ReducerState<typeof rootReducer>;
export default State;

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    display: ['text', 'level'],
  },
  {
    prefix: 'NOTIFICATION/',
  },
);

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  text: undefined,
  type: undefined,
  id: 0,
});

/* ------------- Reducers ------------- */

const display = (state, { text, level }) =>
  state.merge({
    text,
    type: level,
    id: state.id + 1,
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DISPLAY]: display,
});

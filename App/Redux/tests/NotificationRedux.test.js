import Actions, { reducer, INITIAL_STATE } from '../NotificationRedux';
import Notification from '../../Containers/Notification';
import Immutable from 'seamless-immutable';

test('Display', () => {
  const text = 'Ok';
  const type = Notification.types.success;
  const state = reducer(INITIAL_STATE, Actions.display(text, type));

  expect(state.text).toEqual(text);
  expect(state.type).toEqual(type);
  expect(state.id).toEqual(1);
});

test('Display increments id', () => {
  const initialState = Immutable({
    text: 'Ok',
    type: Notification.types.success,
    id: 2,
  });
  const text = 'Ok';
  const type = Notification.types.success;
  const state = reducer(initialState, Actions.display(text, type));

  expect(state.id).toEqual(initialState.id + 1);
});

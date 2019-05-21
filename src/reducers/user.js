import * as UserActionTypes from '../actions/user';
import createReducer from '../utils/create-reducer';

export const initialState = {
  usernameOrEmail: null,
  accessToken: '',
};

const setUser = (state, action) => ({
  ...state,
  usernameOrEmail: action.usernameOrEmail,
  accessToken: action.accessToken,
});

export const user = createReducer(initialState, {
  [UserActionTypes.SET_USER]: setUser,
});

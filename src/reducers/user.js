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

const setUserProfile = (state, action) => ({
  ...state,
  userProfile: action.userProfile,
});

export const user = createReducer(initialState, {
  [UserActionTypes.SET_USER]: setUser,
  [UserActionTypes.SET_USER_PROFILE]: setUserProfile,
});

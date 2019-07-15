import * as UserActionTypes from '../actions/user';
import createReducer from '../utils/create-reducer';

export const initialState = {
  isUserSuccessfullyRegisteredStatus: false,
  userProfile: {
    name: '',
    lastName: '',
    street: '',
    flatNo: 0,
    city: '',
    postalCode: '',
    phoneNo: 0,
    username: '',
  },
};

const setUserProfile = (state, action) => ({
  ...state,
  userProfile: action.userProfile,
});

export const user = createReducer(initialState, {
  [UserActionTypes.SET_USER_PROFILE]: setUserProfile,
});

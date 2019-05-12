import * as UserActionsTypes from '../actions/user';
import createReducer from '../utils/create-reducer';

export const initialState = {
  snackbarInfoType: '',
  snackbarMessage: '',
  snackbarOpenStatus: false,
};

const setShowSnackBar = (state, action) => ({
  ...state,
  snackbarInfoType: action.typeMessage,
  snackbarMessage: action.message,
  snackbarOpenStatus: true,
});

const setCloseSnackBar = state => ({
  ...state, snackbarMessage: '', snackbarOpenStatus: false,
});

export const user = createReducer(initialState, {
  [UserActionsTypes.SHOW_USER_SNACKBAR]: setShowSnackBar,
  [UserActionsTypes.CLOSE_USER_SNACKBAR]: setCloseSnackBar,
});

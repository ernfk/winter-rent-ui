import * as OverviewActionTypes from '../actions/overview';
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

export const overview = createReducer(initialState, {
  [OverviewActionTypes.SHOW_SNACKBAR]: setShowSnackBar,
  [OverviewActionTypes.CLOSE_SNACKBAR]: setCloseSnackBar,
});

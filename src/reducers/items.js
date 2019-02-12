import * as ItemsActionsTypes from '../actions/items';
import createReducer from '../utils/create-reducer';


export const initialState = {
  itemTypes: [],
  itemPropertyDefinitions: [],
  snackbarInfoType: '',
  snackbarMessage: '',
  snackbarOpenStatus: false,
};

const setCloseSnackBar = state => ({
  ...state, snackbarInfoType: '', snackbarMessage: '', snackbarOpenStatus: false,
});

const setFetchedItemDefinitions = (state, action) => ({ ...state, itemPropertyDefinitions: action.itemPropertyDefinitions });

const setFetchedItemTypes = (state, action) => ({ ...state, itemTypes: action.itemTypes });

const setShowSnackBar = (state, action) => ({
  ...state,
  snackbarInfoType: action.typeMessage,
  snackbarMessage: action.message,
  snackbarOpenStatus: true,
});


export const items = createReducer(initialState, {
  [ItemsActionsTypes.CLOSE_SNACK_BAR]: setCloseSnackBar,
  [ItemsActionsTypes.FETCHED_ITEM_DEFINITIONS]: setFetchedItemDefinitions,
  [ItemsActionsTypes.FETCHED_ITEM_TYPES]: setFetchedItemTypes,
  [ItemsActionsTypes.SHOW_SNACK_BAR]: setShowSnackBar,
});

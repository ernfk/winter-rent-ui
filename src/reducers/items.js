import {
  CLOSE_SNACK_BAR,
  FETCHED_ITEM_DEFINITIONS,
  FETCHED_ITEM_TYPES,
  SHOW_SNACK_BAR,
} from '../actions/items';

export const initialState = {
  itemTypes: [],
  itemPropertyDefinitions: [],
  snackbarInfoType: '',
  snackbarMessage: '',
  snackbarOpenStatus: false,
};

export const items = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_ITEM_TYPES: {
      return { ...state, itemTypes: action.itemTypes };
    }
    case FETCHED_ITEM_DEFINITIONS: {
      return { ...state, itemPropertyDefinitions: action.itemPropertyDefinitions };
    }
    case SHOW_SNACK_BAR: {
      return {
        ...state,
        snackbarInfoType: action.typeMessage,
        snackbarMessage: action.message,
        snackbarOpenStatus: true,
      };
    }
    case CLOSE_SNACK_BAR: {
      return {
        ...state,
        snackbarInfoType: '',
        snackbarMessage: '',
        snackbarOpenStatus: false,
      };
    }
    default: {
      return state;
    }
  }
};

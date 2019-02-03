import { FETCHED_ITEM_TYPES } from '../actions/items';

export const initialState = {
  itemTypes: [],
};

export const items = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_ITEM_TYPES: {
      return { ...state, itemTypes: action.itemTypes };
    }
    default: {
      return state;
    }
  }
};

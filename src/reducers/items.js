import { FETCHED_ITEM_DEFINITIONS, FETCHED_ITEM_TYPES } from '../actions/items';

export const initialState = {
  itemTypes: [],
  itemPropertyDefinitions: [],
};

export const items = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_ITEM_TYPES: {
      return { ...state, itemTypes: action.itemTypes };
    }
    case FETCHED_ITEM_DEFINITIONS: {
      return { ...state, itemPropertyDefinitions: action.itemPropertyDefinitions };
    }
    default: {
      return state;
    }
  }
};

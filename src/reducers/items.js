import * as ItemsActionsTypes from '../actions/items';
import createReducer from '../utils/create-reducer';

export const initialState = {
  itemTypes: [],
  itemPropertyDefinitions: [],
  items: [],
  itemImage: {},
};

const setFetchedItemDefinitions = (state, action) => ({ ...state, itemPropertyDefinitions: action.itemPropertyDefinitions });

const setFetchedItemTypes = (state, action) => ({ ...state, itemTypes: action.itemTypes });

const setFetchedItems = (state, action) => ({ ...state, items: action.items });

const setItemImage = (state, action) => ({ ...state, itemImage: action.image });

export const items = createReducer(initialState, {
  [ItemsActionsTypes.FETCHED_ITEM_DEFINITIONS]: setFetchedItemDefinitions,
  [ItemsActionsTypes.FETCHED_ITEM_TYPES]: setFetchedItemTypes,
  [ItemsActionsTypes.FETCHED_ITEMS]: setFetchedItems,
  [ItemsActionsTypes.FETCHED_ITEM_IMAGE]: setItemImage,
});

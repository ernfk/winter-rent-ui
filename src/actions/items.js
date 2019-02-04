/* eslint-disable import/prefer-default-export */
import ItemsService from '../services/items-service';
import makeActionCreator from './action-creator';

const itemsService = new ItemsService();

export const FETCHED_ITEM_TYPES = 'FETCHED_ITEM_TYPES';
const fetchedItemTypes = makeActionCreator(FETCHED_ITEM_TYPES, 'itemTypes');

export const FETCHED_ITEM_DEFINITIONS = 'FETCHED_ITEM_DEFINITIONS';
const fetchedItemPropertyDefinitions = makeActionCreator(FETCHED_ITEM_DEFINITIONS, 'itemPropertyDefinitions');

export const fetchItemsData = () => dispatch => itemsService.getItemTypes()
  .then(response => dispatch(fetchedItemTypes(response.data)))
  .then(() => itemsService.getItemPropertyDefinitions())
  .then(response => dispatch(fetchedItemPropertyDefinitions(response.data)));

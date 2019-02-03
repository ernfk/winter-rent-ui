/* eslint-disable import/prefer-default-export */
import ItemsService from '../services/items-service';
import makeActionCreator from './action-creator';

const itemsService = new ItemsService();

export const FETCHED_ITEM_TYPES = 'FETCHED_ITEM_TYPES';
const fetchedItemsTypes = makeActionCreator(FETCHED_ITEM_TYPES, 'itemTypes');

export const fetchItemsData = () => dispatch => itemsService.getItemTypes()
  .then((response) => {
    dispatch(fetchedItemsTypes(response.data));
  });

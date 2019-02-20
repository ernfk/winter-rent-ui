import ItemsService from '../services/items-service';
import makeActionCreator from '../utils/action-creator';
import FIELDS from '../components/commons/fields';
import * as SnackbarStatus from '../components/commons/snackbar-statuses';

const itemsService = new ItemsService();


export const FETCHED_ITEM_TYPES = 'FETCHED_ITEM_TYPES';
const fetchedItemTypes = makeActionCreator(FETCHED_ITEM_TYPES, 'itemTypes');

export const FETCHED_ITEM_DEFINITIONS = 'FETCHED_ITEM_DEFINITIONS';
const fetchedItemPropertyDefinitions = makeActionCreator(FETCHED_ITEM_DEFINITIONS, 'itemPropertyDefinitions');

const adjustItemPropertyDefinitionsToFields = (itemPropertyDefinitions) => {
  itemPropertyDefinitions
    .forEach((itd) => {
      itd.fieldProperties = FIELDS.get(itd.propertyName.toUpperCase());
    });

  return itemPropertyDefinitions;
};

export const fetchItemsData = () => dispatch => itemsService.getItemTypes()
  .then(response => dispatch(fetchedItemTypes(response.data)))
  .then(itemsService.getItemPropertyDefinitions)
  .then((response) => {
    const itemPropertyDefinitions = adjustItemPropertyDefinitionsToFields(response.data);
    return dispatch(fetchedItemPropertyDefinitions(itemPropertyDefinitions));
  });


export const SHOW_SNACK_BAR = 'SHOW_SNACK_BAR';
export const showSnackbar = makeActionCreator(SHOW_SNACK_BAR, 'typeMessage', 'message');

export const CLOSE_SNACK_BAR = 'CLOSE_SNACK_BAR';
export const closeSnackbar = makeActionCreator(CLOSE_SNACK_BAR);

export const addItem = item => dispatch => itemsService.addItem(item)
  .then(() => dispatch(showSnackbar(SnackbarStatus.INFO, 'Successfully added!')))
  .catch(() => dispatch(showSnackbar(SnackbarStatus.ERROR, 'Something went wrong...')));

export const FETCHED_ITEMS = 'FETCHED_ITEMS';
const fetchedItems = makeActionCreator(FETCHED_ITEMS, 'items');

const flatTheItems = items => items
  .map((item) => {
    const flattedItem = {};
    flattedItem.id = item.id;
    flattedItem.type = item.itemType;

    return item.itemProperties
      .map(ip => ({ property: ip.itemPropertyDefinition.propertyName, value: ip.value }))
      .reduce((r, e) => {
        r[e.property.toLowerCase()] = e.value;
        return r;
      }, flattedItem);
  });

export const fetchItems = () => dispatch => itemsService.getItems()
  .then(response => dispatch(fetchedItems(flatTheItems(response.data))));

export const deleteItem = itemId => dispatch => itemsService.deleteItem(itemId)
  .then(() => dispatch(showSnackbar(SnackbarStatus.INFO, 'Deleted item successfully')))
  .then(() => dispatch(fetchItems()))
  .catch(() => dispatch(showSnackbar(SnackbarStatus.ERROR, 'Delete unsuccessfully...')));

import ItemsService from '../services/items-service';
import ImageService from '../services/image-service';
import makeActionCreator from '../utils/action-creator';
import FIELDS from '../components/commons/fields';
import * as SnackbarStatus from '../components/commons/snackbar-statuses';
import { showSnackbar } from './overview';

const itemsService = new ItemsService();
const imageService = new ImageService();

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

export const fetchItemsData = accessToken => dispatch => itemsService.getItemTypes(accessToken)
  .then(response => dispatch(fetchedItemTypes(response.data)))
  .then(itemsService.getItemPropertyDefinitions)
  .then((response) => {
    const itemPropertyDefinitions = adjustItemPropertyDefinitionsToFields(response.data);
    return dispatch(fetchedItemPropertyDefinitions(itemPropertyDefinitions));
  });

export const addItem = (item, file) => dispatch => itemsService.addItem(item)
  .then((response) => {
    const { id } = response.data;
    if (file && id) {
      return imageService.addImage(file, id);
    }
  })
  .then(() => dispatch(showSnackbar(SnackbarStatus.INFO, 'Successfully added!')))
  .catch((response) => {
    const message = response.response ? response.response.data.message : 'Problem with connection!';
    dispatch(showSnackbar(SnackbarStatus.ERROR, message));
  });

export const FETCHED_ITEMS = 'FETCHED_ITEMS';
const fetchedItems = makeActionCreator(FETCHED_ITEMS, 'items');

const flatTheItems = items => items
  .map((item) => {
    const flattedItem = {};
    flattedItem.id = item.id;
    flattedItem.type = item.itemType;
    flattedItem.modelNo = item.modelNo;

    return item.itemProperties
      .map(ip => ({ property: ip.itemPropertyDefinition.propertyName, value: ip.value }))
      .reduce((r, e) => {
        r[e.property.toLowerCase()] = e.value;
        return r;
      }, flattedItem);
  });

export const fetchItems = accessToken => dispatch => itemsService.getItems(accessToken)
  .then(response => dispatch(fetchedItems(flatTheItems(response.data))));

export const deleteItem = (itemId, imageId) => dispatch => itemsService.deleteItem(itemId)
  .then(() => {
    if (imageId) imageService.deleteImage(imageId);
  })
  .then(() => dispatch(showSnackbar(SnackbarStatus.INFO, 'Deleted item successfully')))
  .then(() => dispatch(fetchItems()))
  .catch(() => dispatch(showSnackbar(SnackbarStatus.ERROR, 'Delete unsuccessfully...')));

export const updateItem = (item, file, imageId) => dispatch => itemsService.updateItem(item)
  .then((response) => {
    const { id } = response.data;

    if (file && id && imageId) {
      return imageService.updateImage(imageId, id, file);
    } if (file && id) {
      return imageService.addImage(file, id);
    }

    dispatch(showSnackbar(SnackbarStatus.INFO, 'Successfully updated!'));
  })
  .then(() => dispatch(fetchItems()))
  .catch(() => dispatch(showSnackbar(SnackbarStatus.ERROR, 'Something went wrong...')));

export const getImageByItemId = itemId => dispatch => imageService.getImageByItemId(itemId)
  .then((res) => {
    const image = res.data ? res.data : {};
    dispatch(fetchedItemImage(image));
  });

export const FETCHED_ITEM_IMAGE = 'FETCHED_ITEM_IMAGE';
const fetchedItemImage = makeActionCreator(FETCHED_ITEM_IMAGE, 'image');

/* eslint-disable import/prefer-default-export */
import ItemsService from '../services/items-service';
import makeActionCreator from './action-creator';

const FIELDS = new Map();
FIELDS.set('RACE STYLE', { fieldType: 'select', menuItems: ['ALL MOUNTAIN', 'ALL ROUND', 'RACE', 'CROSS', 'DOWNHILL'] });
FIELDS.set('SEASON', { fieldType: 'select', menuItems: ['2015/2016', '2016/2017', '2018/2019', 'NEW'] });
FIELDS.set('GENDER', { fieldType: 'select', menuItems: ['MALE', 'WOMEN', 'JUNIOR', 'UNISEX'] });
FIELDS.set('PRODUCER', { fieldType: 'select', menuItems: ['ATOMIC', 'FISCHER', 'HEAD', 'ROSSIGNOL', 'ELAN', 'BLIZZARD'] });
FIELDS.set('COLOR', { fieldType: 'select', menuItems: ['RED', 'GREEN', 'BLUE'] });
FIELDS.set('SECOND COLOR', { fieldType: 'select', menuItems: ['RED', 'GREEN', 'BLUE'] });
FIELDS.set('SIZE', { fieldType: 'select', menuItems: ['S', 'M', 'L', 'XL'] });
FIELDS.set('MODEL', { fieldType: 'textfield', adornment: { value: '', position: '' } });
FIELDS.set('PRICE', { fieldType: 'textfield', adornment: { value: 'PLN', position: 'end' } });
FIELDS.set('LENGTH', { fieldType: 'textfield', adornment: { value: 'CM', positions: 'end' } });

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

/* eslint-disable import/prefer-default-export */
import ItemsService from '../services/items-service';
import makeActionCreator from './action-creator';

const FIELDS = new Map();
FIELDS.set('RACE STYLE', { stateRef: 'raceStyle', fieldType: 'select', menuItems: ['ALL MOUNTAIN', 'ALL ROUND', 'RACE', 'CROSS', 'DOWNHILL'] });
FIELDS.set('SEASON', { stateRef: 'season', fieldType: 'select', menuItems: ['2015/2016', '2016/2017', '2018/2019', 'NEW'] });
FIELDS.set('GENDER', { stateRef: 'gender', fieldType: 'select', menuItems: ['MALE', 'WOMEN', 'JUNIOR', 'UNISEX'] });
FIELDS.set('PRODUCER', { stateRef: 'producer', fieldType: 'select', menuItems: ['ATOMIC', 'FISCHER', 'HEAD', 'ROSSIGNOL', 'ELAN', 'BLIZZARD'] });
FIELDS.set('COLOR', { stateRef: 'color', fieldType: 'select', menuItems: ['RED', 'GREEN', 'BLUE'] });
FIELDS.set('SECOND COLOR', { stateRef: 'secondColor', fieldType: 'select', menuItems: ['RED', 'GREEN', 'BLUE'] });
FIELDS.set('SIZE', { stateRef: 'size', fieldType: 'select', menuItems: ['S', 'M', 'L', 'XL'] });
FIELDS.set('MODEL', { stateRef: 'model', fieldType: 'textfield', adornment: { value: '', position: '' } });
FIELDS.set('LENGTH', { stateRef: 'length', fieldType: 'textfield', adornment: { value: 'CM', positions: 'end' } });
FIELDS.set('PRICE', { stateRef: 'price', fieldType: 'textfield', adornment: { value: 'PLN', position: 'end' } });

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

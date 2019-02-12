const FIELDS = new Map();
FIELDS.set('RACE STYLE', { stateRef: 'raceStyle', fieldType: 'select', menuItems: ['ALL MOUNTAIN', 'ALL ROUND', 'RACE', 'CROSS', 'DOWNHILL'] });
FIELDS.set('SEASON', { stateRef: 'season', fieldType: 'select', menuItems: ['2015/2016', '2016/2017', '2018/2019', 'NEW'] });
FIELDS.set('GENDER', { stateRef: 'gender', fieldType: 'select', menuItems: ['MALE', 'WOMEN', 'JUNIOR', 'UNISEX'] });
FIELDS.set('PRODUCER', { stateRef: 'producer', fieldType: 'select', menuItems: ['ATOMIC', 'FISCHER', 'HEAD', 'ROSSIGNOL', 'ELAN', 'BLIZZARD'] });
FIELDS.set('COLOR', { stateRef: 'color', fieldType: 'select', menuItems: ['RED', 'GREEN', 'BLUE'] });
FIELDS.set('SECOND COLOR', { stateRef: 'secondColor', fieldType: 'select', menuItems: ['RED', 'GREEN', 'BLUE'] });
FIELDS.set('SIZE', { stateRef: 'size', fieldType: 'select', menuItems: ['S', 'M', 'L', 'XL'] });
FIELDS.set('MODEL', {
  stateRef: 'model',
  fieldType: 'textfield',
  adornment: { value: '', position: 'end' },
  sortNo: 1,
});
FIELDS.set('PRICE', {
  stateRef: 'price',
  fieldType: 'textfield',
  adornment: { value: 'PLN', position: 'end' },
  sortNo: 2,
});
FIELDS.set('LENGTH', {
  stateRef: 'length',
  fieldType: 'textfield',
  adornment: { value: 'CM', positions: 'end' },
  sortNo: 3,
});

export default FIELDS;

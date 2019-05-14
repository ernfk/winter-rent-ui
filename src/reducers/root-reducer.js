import { combineReducers } from 'redux';
import { items } from './items';
import { overview } from './overview';

const rootReducer = combineReducers({
  items,
  overview,
});

export default rootReducer;

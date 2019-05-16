import { combineReducers } from 'redux';
import { items } from './items';
import { overview } from './overview';
import { user } from './user';

const rootReducer = combineReducers({
  items,
  overview,
  user,
});

export default rootReducer;

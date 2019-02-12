/* eslint-disable no-prototype-builtins */
function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action);
    }
    return state;
  };
}

export default createReducer;

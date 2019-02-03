export const initialState = {
  itemTypes: [],
};

export const items = (state = initialState, action) => {
  switch (action.type) {
    // case SET_START_SEARCH_CITY: {
    //     return {...state, city: action.payload};
    // }
    default: {
      return state;
    }
  }
};

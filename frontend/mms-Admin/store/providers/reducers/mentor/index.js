import GridActionTypes from './types';

const gridStateReducer = (gridState, action) => {
  switch (action.type) {
    case GridActionTypes.MENTOR_GRID_STATE:
      return {
        ...gridState,
        ...action.payload
      };
    default:
      return gridState;
  }
};

export default gridStateReducer;

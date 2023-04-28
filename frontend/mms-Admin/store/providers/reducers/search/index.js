import SearchTypes from './types';

const searchReducer = (search, action) => {
  console.log(search)
  switch (action.type) {
    case SearchTypes.ARCHIVE_SEARCH:
      return {
        ...search,
        ...action.payload
      };
    default:
      return search;
  }
};

export default searchReducer;

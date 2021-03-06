const initState = {
  query: "",
  input: {},
  noResults: false,
};

const getQuery = (state = initState, action) => {
  switch (action.type) {
    case "GET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "GET_INPUT":
      return {
        ...state,
        input: action.payload,
      };
    case "GET_NO_RESULTS":
      return {
        ...state,
        noResults: action.payload,
      };
    default:
      return { ...state };
  }
};

export default getQuery;

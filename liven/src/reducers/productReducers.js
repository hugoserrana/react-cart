import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FILTER_PRODUCTS,
  FETCH_PRODUCT_FAILURE,
  ORDER_PRODUCTS,
} from "../types";

const initialState = {
  isLoading: true,
  error: null,
  filteredItems: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS:
      return {
        ...state,
        filter: action.payload.filter,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, error: null, isLoading: true };
    case FETCH_PRODUCT_SUCCESS:
      return {
        items: action.payload,
        filteredItems: action.payload,
        error: null,
        isLoading: false,
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

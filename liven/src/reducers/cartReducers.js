import {
  ADD_TO_CART,
  CHANGE_ITEM_COUNT_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from "../types";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
    case CHANGE_ITEM_COUNT_CART:
      return { cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    case CLEAR_CART:
      localStorage.clear("cartItems");
      return { cartItems: [] };
    default:
      return state;
  }
};

import { enqueueSnackbar } from "./notifierActions";

import {
  ADD_TO_CART,
  CHANGE_ITEM_COUNT_CART,
  REMOVE_FROM_CART,
} from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;

  cartItems.forEach((x) => {
    if (x.id === product.id) {
      alreadyExists = true;
      x.count++;
    }
  });

  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }

  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  dispatch(
    enqueueSnackbar({
      message: `O produto ${product.name} foi adicionado no carrinho de compras`,
      options: { variant: "success" },
    })
  );
};

export const changeCountToCart = (product, value) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  value = Number(value);

  if (value > -1 && value <= product.stock) {
    cartItems.forEach((x) => {
      if (x.id === product.id) {
        alreadyExists = true;
        x.count = value;
      }
    });

    if (!alreadyExists) {
      cartItems.push({ ...product, count: value });
    }
  }

  dispatch({
    type: CHANGE_ITEM_COUNT_CART,
    payload: { cartItems },
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x.id !== product.id);

  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  dispatch(
    enqueueSnackbar({
      message: `O produto ${product.name} foi removido com sucesso do carrinho de compras`,
      options: { variant: "success" },
    })
  );
};

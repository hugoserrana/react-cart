import {
  CREATE_ORDER,
  CLEAR_CART,
  CLEAR_ORDER,
  FETCH_ORDERS,
  FETCH_PRODUCT_SUCCESS,
} from "../types";
import { enqueueSnackbar } from "./notifierActions";
import { displayCurrency } from "../utils";

export const createOrder = (order) => (dispatch, getState) => {
  dispatch({ type: CREATE_ORDER, payload: order });
  dispatch({ type: CLEAR_CART });

  // Simula o recarregamento dos dados no servidor com a baixa no estoque
  const items = getState().products.items.slice();

  for (const item of order.cartItems) {
    const a = items.find((e) => e.id === item.id);
    a.stock = a.stock - item.count;
  }

  dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: items });

  dispatch(
    enqueueSnackbar({
      message: `Sua compra de ${displayCurrency(
        order.total
      )} foi concluída com sucesso e os itens retirados do estoque`,
      options: { variant: "success" },
    })
  );
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};

export const fetchOrders = () => (dispatch) => {
  dispatch({
    type: FETCH_ORDERS,
    //payload: data
  });
};

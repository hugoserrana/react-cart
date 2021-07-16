import { FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_SUCCESS } from "../types";
import { FILTER_PRODUCTS, ORDER_PRODUCTS } from "../types";
import { apiProductListGet } from "../restApi";
import { priceToNum } from "../utils";

export const fetchProducts = () => async (dispatch) => {
  const res = await apiProductListGet();

  if (res.ok) {
    const data = await res.json();

    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: FETCH_PRODUCT_FAILURE,
      payload: `Ocorreu um erro ao buscar os itens: ${res.statusText}`,
    });
  }
};

export const filterProducts = (products, filter) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS,
    payload: {
      filter: filter,
      items:
        filter === ""
          ? products
          : products.filter(
              (x) =>
                x.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
                x.id.indexOf(filter) >= 0
            ),
    },
  });
};

export const sortProductsEnum = {
  ID_ASC: "ID_ASC",
  ID_DESC: "ID_DESC",
  CREATED_AT_ASC: "CREATED_AT_ASC",
  CREATED_AT_DESC: "CREATED_AT_DESC",
  NAME_ASC: "NAME_ASC",
  NAME_DESC: "NAME_DESC",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();

  switch (sort) {
    case sortProductsEnum.CREATED_AT_ASC:
      sortedProducts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    case sortProductsEnum.CREATED_AT_DESC:
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case sortProductsEnum.ID_ASC:
      sortedProducts.sort((a, b) => a.id - b.id);
      break;
    case sortProductsEnum.ID_DESC:
      sortedProducts.sort((a, b) => b.id - a.id);
      break;
    case sortProductsEnum.NAME_ASC:
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case sortProductsEnum.NAME_DESC:
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case sortProductsEnum.PRICE_ASC:
      sortedProducts.sort((a, b) => priceToNum(a.price) - priceToNum(b.price));
      break;
    case sortProductsEnum.PRICE_DESC:
      sortedProducts.sort((a, b) => priceToNum(b.price) - priceToNum(a.price));
      break;
    default:
      break;
  }

  dispatch({
    type: ORDER_PRODUCTS,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};

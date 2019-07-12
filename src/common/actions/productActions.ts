import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_SORT
} from "./type";

export const fetchProducts = (payload: any) => {
  return { type: FETCH_PRODUCTS, payload };
};

export const filterProductBySize = (payload: any) => {
  return { type: FILTER_PRODUCTS_BY_SIZE, payload };
};

export const filterProductBySort = (payload: any) => {
  return { type: FILTER_PRODUCTS_BY_SORT, payload };
};

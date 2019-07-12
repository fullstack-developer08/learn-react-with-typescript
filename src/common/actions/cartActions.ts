import { ADD_TO_CART, REMOVE_FROM_CART } from "./type";

export const addToCart = (payload: any) => {
  return { type: ADD_TO_CART, payload };
};

export const removeFromCart = (payload: any) => {
  return { type: REMOVE_FROM_CART, payload };
};

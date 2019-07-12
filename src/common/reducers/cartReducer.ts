import { IProduct } from "../interface/products";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/type";

interface state {
  cartItems: IProduct[];
}


const initialState = {
  cartItems: []
};

const cartReducer = (state: state = initialState, action: any): state => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cartItems: action.payload };
    case REMOVE_FROM_CART:
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};

export default cartReducer;

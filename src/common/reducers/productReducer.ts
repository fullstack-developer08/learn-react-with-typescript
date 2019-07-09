import { IProduct } from "../interface/products";
import { FETCH_PRODUCTS } from "../actions/type";

interface state {
  products: IProduct[];
}

interface action {
  type: string;
  payload: any;
}

const initialState = {
  products: []
};

const productReducer = (state: state = initialState, action: action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default productReducer;

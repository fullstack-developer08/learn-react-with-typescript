import { IProduct } from "../interface/products";
import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SORT,
  FILTER_PRODUCTS_BY_SIZE
} from "../actions/type";

interface state {
  products: IProduct[];
  filteredProducts: IProduct[];
  count: number;
}

const initialState = {
  products: [],
  filteredProducts: [],
  count: 0
};

const productReducer = (state: state = initialState, action: any): state => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        count: action.payload.length
      };
    case FILTER_PRODUCTS_BY_SORT:
      return {
        ...state,
        filteredProducts: action.payload,
        count: action.payload.length
      };
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        filteredProducts: action.payload,
        count: action.payload.length
      };
    default:
      return state;
  }
};

export default productReducer;

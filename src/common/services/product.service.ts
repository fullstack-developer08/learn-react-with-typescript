import axios from 'axios';

const PRODUCTS_API = 'http://localhost:8000/products';

export const fetchProductService = () => {
    return axios.get(PRODUCTS_API).then(res => res.data);
}
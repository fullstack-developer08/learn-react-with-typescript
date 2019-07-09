import { createStore } from "redux";
import thunk from 'react-thunk';

const initialState = {};
import rootReducer from './reducers';

export default createStore(rootReducer, initialState, thunk);
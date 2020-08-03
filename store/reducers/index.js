import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import ordersReducer from './ordersReducer'
import authReducer from './authReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

export default rootReducer;

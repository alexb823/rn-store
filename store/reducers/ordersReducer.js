import { ADD_ORDER } from '../actions/ordersActions';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        Date.now().toString(),
        action.orderData.cartItems,
        action.orderData.totalAmount,
        new Date(),
      );
      return {...state, orders: [...state.orders, newOrder]}

    default:
      return state;
  }
};

export default ordersReducer;

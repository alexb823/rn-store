import { ADD_TO_CART } from '../actions/cartActions';
import CartItem from '../../models/cartItem';

const initialState = {
  items: {},
  totalAmount: 0,
};

//helper func
const addToCartHelper = (state, action) => {
  const { items, totalAmount } = state;
  const { price, title, id } = action.product;

  let newOrUpdatedCartItem;

  if (items[id]) {
    const { quantity, sum } = items[id];
    newOrUpdatedCartItem = new CartItem(
      quantity + 1,
      price,
      title,
      sum + price
    );
  } else {
    newOrUpdatedCartItem = new CartItem(1, price, title, price);
  }
  return {
    ...state,
    items: { ...items, [id]: newOrUpdatedCartItem },
    totalAmount: totalAmount + price,
  };
};


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCartHelper(state, action);
    default:
      return state;
  }
};

export default cartReducer;

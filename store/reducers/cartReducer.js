import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';
import CartItem from '../../models/cartItem';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCartHelper(state, action);
    case REMOVE_FROM_CART:
      return removeFromCartHelper(state, action);
    default:
      return state;
  }
};

export default cartReducer;

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

const removeFromCartHelper = (state, action) => {
  const { items, totalAmount } = state;
  const { id } = action;
  const updatedItems = { ...items };
  const selectedItem = { ...updatedItems[id] };
  updatedItems[id] = selectedItem;
  const updatedTotal = totalAmount - selectedItem.productPrice;

  if (selectedItem.quantity > 1) {
    selectedItem.quantity -= 1;
    selectedItem.sum -= selectedItem.productPrice;
  } else {
    delete updatedItems[id];
  }
  return { ...state, items: updatedItems, totalAmount: updatedTotal };
};

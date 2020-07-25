import PRODUCTS from '../../data/dummyData';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
  return state;
};

export default productsReducer;

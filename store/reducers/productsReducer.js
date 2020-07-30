import PRODUCTS from '../../data/dummyData';
import {
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  SET_PRODUCTS,
} from '../actions/productsActions';
import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

// (id, ownerId, title, imageUrl, description, price)

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((p) => p.ownerId === 'u1'),
      };
    case CREATE_PRODUCT:
      return createProductHelper(state, action);
    case UPDATE_PRODUCT:
      return updateProductHelper(state, action);
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
    default:
      return state;
  }
};

// Helper funcs
const createProductHelper = (state, action) => {
  const { availableProducts, userProducts } = state;
  const { id, title, imageUrl, description, price } = action.productData;
  const product = new Product(id, 'u1', title, imageUrl, description, price);

  return {
    ...state,
    availableProducts: [...availableProducts, product],
    userProducts: [...userProducts, product],
  };
};

const updateProductHelper = (state, action) => {
  const { availableProducts, userProducts } = state;
  const {
    id,
    productData: { title, imageUrl, description },
  } = action;
  const idxUserPr = userProducts.findIndex((p) => p.id === id);
  const idxAvailablePr = availableProducts.findIndex((p) => p.id === id);

  const product = new Product(
    Date.now().toString(),
    userProducts[idxUserPr].ownerId,
    title,
    imageUrl,
    description,
    userProducts[idxUserPr].price
  );

  const updateUserProducts = [...userProducts];
  const updatedAvailableProducts = [...availableProducts];
  updateUserProducts[idxUserPr] = product;
  updatedAvailableProducts[idxAvailablePr] = product;

  return {
    ...state,
    availableProducts: updatedAvailableProducts,
    userProducts: updateUserProducts,
  };
};

export default productsReducer;

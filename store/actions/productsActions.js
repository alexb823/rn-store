import firebase from '../../api/firebase';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return (dispatch) => {
    return firebase
      .get('/products.json')
      .then(({ data }) => {
        const products = [];
        // eslint-disable-next-line guard-for-in
        for (const key in data) {
          products.push({ ...data[key], id: key, ownerId: 'u1' });
        }
        return products;
      })
      .then((products) => dispatch({ type: SET_PRODUCTS, products }))
      .catch((error) => {
        console.log(error, 'in the productsActions/fetchProducts');
        throw error;
      });
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return (dispatch) => {
    return firebase
      .post('/products.json', { title, imageUrl, description, price })
      .then(({ data }) =>
        dispatch({
          type: CREATE_PRODUCT,
          productData: { id: data.name, title, imageUrl, description, price },
        })
      )
      .catch((error) => {
        console.log(error, 'in the productsActions/createProduct');
        throw error;
      });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return (dispatch) => {
    return firebase
      .patch(`/products/${id}.json`, {
        title,
        imageUrl,
        description,
      })
      .then(() =>
        dispatch({
          type: UPDATE_PRODUCT,
          id,
          productData: { title, imageUrl, description },
        })
      )
      .then(dispatch(fetchProducts()))
      .catch((error) => {
        console.log(error, 'in the productsActions/updateProduct');
        throw error;
      });
  };
};

export const deleteProduct = (productId) => {
  return (dispatch) => {
    return firebase
      .delete(`/products/${productId}.json`)
      .then(() => dispatch({ type: DELETE_PRODUCT, productId }))
      .then(dispatch(fetchProducts()))
      .catch((error) => {
        console.log(error, 'in the productsActions/deleteProduct');
        throw error;
      });
  };
};

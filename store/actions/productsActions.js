import firebase from '../../api/firebase';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    return firebase
      .get('/products.json')
      .then(({ data }) => {
        const products = [];
        for (const key in data) {
          products.push({ ...data[key], id: key});
        }
        const userProducts = products.filter((p) => p.ownerId === userId);
        return { products, userProducts };
      })
      .then(({ products, userProducts }) =>
      dispatch({ type: SET_PRODUCTS, products, userProducts })
      )
      .catch((error) => {
        console.log(error, 'in the productsActions/fetchProducts');
        throw error;
      });
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    return firebase
      .post(`/products.json?auth=${token}`, {
        title,
        imageUrl,
        description,
        price,
        ownerId: userId,
      })
      .then(({ data }) =>
        dispatch({
          type: CREATE_PRODUCT,
          productData: {
            id: data.name,
            ownerId: userId,
            title,
            imageUrl,
            description,
            price,
          },
        })
      )
      .catch((error) => {
        console.log(error, error.response.data.error.message, 'in the productsActions/createProduct');
        throw error;
      });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return firebase
      .patch(`/products/${id}.json?auth=${token}`, {
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
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return firebase
      .delete(`/products/${productId}.json?auth=${token}`)
      .then(() => dispatch({ type: DELETE_PRODUCT, productId }))
      .then(dispatch(fetchProducts()))
      .catch((error) => {
        console.log(error, 'in the productsActions/deleteProduct');
        throw error;
      });
  };
};

import firebase from '../../api/firebase';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (items, totalAmount) => {
  const date = new Date().toISOString();
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    return firebase
      .post(`/orders/${userId}.json?auth=${token}`, {
        items,
        totalAmount,
        date,
      })
      .then(({ data }) =>
        dispatch({
          type: ADD_ORDER,
          orderData: { id: data.name, items, totalAmount, date },
        })
      )
      .catch((e) => console.log(e, e.response.data.error.message));
  };
};

// id, items, totalAmount, date)
export const fetchOrders = () => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    return firebase
      .get(`/orders/${userId}.json`)
      .then(({ data }) => {
        const orders = [];
        for (const key in data) {
          orders.push({ ...data[key], id: key });
        }
        dispatch({ type: SET_ORDERS, orders});
      })
      .catch((e) => console.log(e, e.response.data.error.message));
  };
};

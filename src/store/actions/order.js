import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const epidemiologySuccess = (id, orderData) => {
    return {
        type: actionTypes.EPIDEMIOLOGY_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const epidemiologyFail = (error) => {
    return {
        type: actionTypes.FETCH_ITEMS_FAILED,
        error: error 
    };
};

export const epidemiologyStart = () => {
    return {
        type: actionTypes.EPIDEMIOLOGY_START
    };
};

export const epidemiology = (orderData) => {
  return (dispatch) => {
    dispatch(epidemiologyStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
          console.log(response.data);
        dispatch(epidemiologySuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(epidemiologyFail(error));
      });
  };
};

export const epidemiologyInit = () =>  {
    return {
        type: actionTypes.EPIDEMIOLOGY_INIT
    }
};

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then((res) => {
        // console.log(res);
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
          // console.log(key);
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
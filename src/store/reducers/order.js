import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    initialaized: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EPIDEMIOLOGY_INIT:
            // return {
            //     ...state,
            //     initialaized: false
            // }
            return updateObject(state, {initialaized: false});
        case actionTypes.EPIDEMIOLOGY_START:
            // return {
            //     ...state,
            //     loading: true
            // }
            return updateObject(state, {loading: true});
        case actionTypes.EPIDEMIOLOGY_SUCCESS: 
            // const newOrder = {
            //     ...action.orderData,
            //     id: action.orderId
            // }
            // return {
            //     ...state,
            //     loading: false,
            //     initialaized: true,
            //     order: state.orders.concat(newOrder)
            // };
            const newOrder = updateObject(action.orderData, {id: action.orderId});
            return updateObject(state, {                 
                loading: false,
                initialaized: true,
                order: state.orders.concat(newOrder)
            });
        case actionTypes.FETCH_ITEMS_FAILED:
            // return {
            //     ...state,
            //     loading: false,

            // };
            return updateObject(state, {loading: false});
        case actionTypes.FETCH_ORDERS_START:
            // return {
            //     ...state,
            //     loading: true
            // };
            return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            // return {
            //     ...state,
            //     orders: action.orders,
            //     loading: false
            // };
            return updateObject(state, {                
                orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            // return {
            //     ...state,
            //     loading: false
            // }
            return updateObject(state, {loading: false});
        default: 
            return state;
    }
}

export default reducer;
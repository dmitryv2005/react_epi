import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addItem = (name) => {
    return {
        type: actionTypes.ADD_ITEM,
        itemName: name
    };
};

export const removeItem = (name) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        itemName: name
    };
};

export const setItems = items => {
    return {
        type: actionTypes.SET_ITEMS,
        items: items
    }
};

export const fetchItemsFailed = () => {
    return {
        type: actionTypes.FETCH_ITEMS_FAILED
    }
}

export const initItems = () => {
    return dispatch => {
        axios.get('https://react-my-first-project-1679c.firebaseio.com/Itesms.json')
            .then(response => {
                dispatch(setItems(response.data))
            }).catch(error => {
                dispatch(fetchItemsFailed());
            });
    };
};
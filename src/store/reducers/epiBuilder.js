import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    items: null,
    totalPrice: 4,
    error: false
};

const ITEMS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addItem = (state, action) => {
    const updatedItem = { [action.itemName]: state.items[action.itemName] + 1 };
    const updatedItems = updateObject(state.items, updatedItem);
    const updatedState = {
        items: updatedItems,
        totalPrice: state.totalPrice + ITEMS_PRICES[action.itemName]
    }
    return updateObject(state, updatedState);
}

const removeItem = (state, action) => {
    const updatedIt = { [action.itemName]: state.items[action.itemName] - 1 };
    const updatedIts = updateObject(state.items, updatedIt);
    const updatedStat = {
        items: updatedIts,
        totalPrice: state.totalPrice - ITEMS_PRICES[action.itemName]
    }
    return updateObject(state, updatedStat);
}

const setItems = (state, action) => {
    return updateObject( state, {
        items: {
            salad: action.items.salad,
            bacon: action.items.bacon,
            cheese: action.items.cheese,
            meat: action.items.meat
        },
        totalPrice: 4,
        error: false
    });
}

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        // return {
        //     ...state,
        //     items: {
        //         ...state.items,
        //         [action.itemName]: state.items[action.itemName] + 1
        //     },
        //     totalPrice: state.totalPrice + ITEMS_PRICES[action.itemName]
        // };
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
            // return {
            //     ...state,
            //     items: {
            //         ...state.items,
            //         [action.itemName]: state.items[action.itemName] - 1
            //     },
            //     totalPrice: state.totalPrice - ITEMS_PRICES[action.itemName]               
            // };
        case actionTypes.SET_ITEMS: return setItems(state, action);
            // return {
            //     ...state, 
            //     // items: action.items,  to modify the order of ingrediants
            //     items: {
            //         salad: action.items.salad,
            //         bacon: action.items.bacon,
            //         cheese: action.items.cheese,
            //         meat: action.items.meat
            //     },
            //     totalPrice: 4,
            //     error: false
            // };
        case actionTypes.FETCH_ITEMS_FAILED: 
            // return {
            //     ...state,
            //     error: true
            // }
           return updateObject( state, { error: true }); 
        default: 
            return state;
    }
};

export default reducer;
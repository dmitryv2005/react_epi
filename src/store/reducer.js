import * as actionTypes from './actions';

const initialState = {
    items: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const ITEMS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.ADD_ITEM: 
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemName]: state.items[action.itemName] + 1
                },
                totalPrice: state.totalPrice + ITEMS_PRICES[action.itemName]
            };
        case actionTypes.REMOVE_ITEM: 
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemName]: state.items[action.itemName] - 1
                },
                totalPrice: state.totalPrice - ITEMS_PRICES[action.itemName]               
            };
        default: 
            return state;
    }
};

export default reducer;
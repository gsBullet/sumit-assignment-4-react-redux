// initial state 

import { FEATURED } from "./actionsType";

const initialState = {
    status : 'All'
}

// reducer

const featureReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEATURED:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}

export default featureReducer;
import { initialState } from "../store";
import { SEARCH_VALUE } from "../Actions/actionTypes.js";



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_VALUE:
            return {
                searchValue: action.payload
            }

        default:
            return state
    }
}

export default userReducer
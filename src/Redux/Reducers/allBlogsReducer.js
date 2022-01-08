import { initialState } from "../store";
import { FILL_BLOG_DATA } from "../Actions/actionTypes.js";
import { FILL_BLOG_DATA_LOADING } from "../Actions/actionTypes.js";
import { FILL_BLOG_DATA_ERROR } from "../Actions/actionTypes.js";


const allBlogReducer = (state = initialState.allBlogs, action) => {
    switch (action.type) {
        case FILL_BLOG_DATA:
            return {
                ...state,
                blogs: action.payload
            }
        case FILL_BLOG_DATA_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FILL_BLOG_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default allBlogReducer
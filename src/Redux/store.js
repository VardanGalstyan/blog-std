import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allBlogsReducer from './Reducers/allBlogsReducer';
import userReducer from './Reducers/userReducer';


export const initialState = {
    allBlogs: {
        blogs: [],
        loading: false,
        error: null
    },

    loggedUser: {
        user: {},
        loading: false,
        error: null
    }
}


const combinedReducers = combineReducers({
    allBlogs: allBlogsReducer,
    loggedUser: userReducer

})


export const store = createStore(
    combinedReducers,
    initialState,
    process.env.REACT_APP_DEVELOPMENT ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk)) : compose(applyMiddleware(thunk))
)



export default store
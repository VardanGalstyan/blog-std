import { FILL_BLOG_DATA_ERROR, FILL_BLOG_DATA_LOADING, FILL_BLOG_DATA, FILL_USER_DATA, FILL_USER_DATA_LOADING, FILL_USER_DATA_ERROR } from "./actionTypes";

export const fillDataBaseAction = () => {


    return async (dispatch, getState) => {

        try {
            let response = await fetch(`${process.env.REACT_APP_URL}/blogs`)
            if (response.ok) {
                let data = await response.json()
                dispatch({
                    type: FILL_BLOG_DATA_LOADING,
                    payload: false
                })
                dispatch({
                    type: FILL_BLOG_DATA,
                    payload: data
                })
            } else {
                dispatch({
                    type: FILL_BLOG_DATA_LOADING,
                    payload: false
                })
                dispatch({
                    type: FILL_BLOG_DATA_ERROR,
                    payload: true
                })
            }
        } catch (error) {
            dispatch({
                type: FILL_BLOG_DATA_LOADING,
                payload: false
            })
            dispatch({
                type: FILL_BLOG_DATA_ERROR,
                payload: true
            })
        }

    }
}


export const userDataBaseAction = (token) => {


    return async (dispatch, getState) => {

        try {
            let response = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                let data = await response.json()
                dispatch({
                    type: FILL_USER_DATA_LOADING,
                    payload: false
                })
                dispatch({
                    type: FILL_USER_DATA,
                    payload: data
                })
            } else {
                dispatch({
                    type: FILL_USER_DATA_LOADING,
                    payload: false
                })
                dispatch({
                    type: FILL_USER_DATA_ERROR,
                    payload: true
                })
            }
        } catch (error) {
            dispatch({
                type: FILL_USER_DATA_LOADING,
                payload: false
            })
            dispatch({
                type: FILL_USER_DATA_ERROR,
                payload: true
            })
        }

    }
}
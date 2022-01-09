import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import { ClockLoader } from "react-spinners"
import { useDispatch, useSelector } from 'react-redux'
import { fillSingleBlogAction } from '../../Redux/Actions/actions'
import { BiError } from 'react-icons/bi'

function SingleComment({ comment, id }) {

    const dispatch = useDispatch()
    const token = localStorage.getItem('blogToken')
    const { loggedUser } = useSelector(state => state)
    const { blog } = useSelector(state => state.selectedBlog)
    const initialState = { comment: comment.comment }

    const [commentsToEdit, setCommentsToEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [toEdit, setToEdit] = useState(initialState)
    const [error, setError] = useState(false)


    const handleEditComment = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/comments/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(toEdit)
            })
            if (response.ok) {
                dispatch(fillSingleBlogAction(id))
                setCommentsToEdit(false)
                setIsLoading(false)
            } else {
                setError(true)
                setIsLoading(false)
                console.log('Something went wrong with the edit');
            }
        } catch (error) {
            setError(true)
            setIsLoading(false)
            console.log(error);
        }
    }

    const handleCancelEdit = () => {
        setCommentsToEdit(false)
        setToEdit(initialState)
    }

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/comments/${comment._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                setIsLoading(false)
                dispatch(fillSingleBlogAction(id))
            } else {
                setError(true)
                setIsLoading(false)
            }
        } catch (error) {
            setError(true)
            setIsLoading(false)
            console.log(error);
        }

    }


    return (
        <div key={comment._id} className='single-comment'>
            <div className='comment-main-header'>
                <span className='comment-header'>
                    <img className='mr-2' src="https://picsum.photos/200/300" alt="avatar-user" />
                    <span>{comment.author.nickname}</span>
                </span>
                {
                    !commentsToEdit &&
                    <div className='comment-buttons'>
                        {
                            blog.author._id === loggedUser.user._id || comment.author._id === loggedUser.user._id ?
                                <span onClick={() => setCommentsToEdit(true)}><MdModeEdit /></span> : ''
                        }
                        {

                            comment.author._id === loggedUser.user._id &&
                            <span onClick={handleDelete}><AiFillDelete /></span>
                        }
                    </div>
                }
            </div>
            <div className='px-2 py-2 comment-content'>
                {
                    !commentsToEdit ?
                        comment.comment :
                        <div className='edit-comment-container'>
                            < input
                                type="text"
                                value={toEdit.comment}
                                onChange={e => setToEdit({ comment: e.target.value })}
                            />
                            <div className='edit-comment-buttons'>
                                {isLoading ?
                                    <ClockLoader color={'#353535'} size={20} /> :
                                    error ? <span onClick={handleCancelEdit} className='error-message'><BiError /> Some error accrued! </span> :
                                        <>
                                            <span onClick={handleEditComment}>Save</span>
                                            <span onClick={handleCancelEdit}>Cancel</span>
                                        </>
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default SingleComment

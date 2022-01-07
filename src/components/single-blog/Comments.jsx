import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import SingleComment from './SingleComment'

function Comments({ data, handleFetch }) {

    const { id } = useParams()
    const initialState = { comment: '' }
    const token = localStorage.getItem('blogToken')

    const [comment, setComment] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleComment = async (e) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/comments/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
            if (response.ok) {
                setIsLoading(false)
                handleFetch()
                setComment(initialState)
            } else {
                setError(true)
                setIsLoading(false)
            }
        } catch {
            console.log(error);
        }
    }

    return (
        <Row className='mt-5 comment-row'>
            <div className='single-blog-comment-container'>
                {data.comments && data.comments.map(comment => <SingleComment comment={comment} key={comment._id} />)}
            </div>
            <div className='single-blog-comment-input'>
                <input
                    type="text"
                    placeholder='Comment'
                    value={comment.comment}
                    onChange={(e) => setComment({ comment: e.target.value })}
                />
            </div>
            <div>
                <button
                    onClick={() => handleComment()}
                    className='navbar-button m-2'>
                    Comment
                </button>
            </div>
        </Row>
    )
}

export default Comments

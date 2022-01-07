import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import './style.css'

function SingleBlog() {

    const { id } = useParams()
    const token = localStorage.getItem('blogToken')
    const initialState = { comment: '' }

    const [data, setData] = useState([])
    const [comment, setComment] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/users/blogs/${id}`)
            if (response.ok) {
                const data = await response.json()
                setData(data)
            }
        } catch (error) {

        }
    }

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
        <Container className='mt-5'>
            <Row className='single-blog-container'>
                <div><img src="https://picsum.photos/200/300" alt="blog-cover" /></div>
                <div className='single-blog-body'>
                    <div>{data.title}</div>
                    <div>{data.main_text}</div>
                </div>
                <div className='single-blog-footer'>
                    <button className='navbar-button'>Edit</button>
                    <button className='navbar-button'>Delete</button>
                </div>
            </Row>
            {
                token &&
                <Row className='mt-5 comment-row'>
                    <div className='single-blog-comment-container'>
                        {data.comments && data.comments.map(comment => (
                            <div className='single-comment'>
                                <div>
                                    <span className='mr-2'><img src="https://picsum.photos/200/300" alt="avatar-user" /></span>
                                    <span></span>
                                </div>
                                <div className='px-2 py-2'>{comment.comment}</div>
                            </div>
                        )
                        )}
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
            }
        </Container>
    )
}

export default SingleBlog

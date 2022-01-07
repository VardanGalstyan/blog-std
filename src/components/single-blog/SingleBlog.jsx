import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.css'
import Comments from './Comments'

function SingleBlog() {

    const { id } = useParams()
    const token = localStorage.getItem('blogToken')
    const navigate = useNavigate()

    const [data, setData] = useState([])
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

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                navigate('/')
            } else {
                setError(true)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Container className='my-5'>
            <Row className='single-blog-container'>
                <div className='single-blog-cover'>
                    <img src="https://picsum.photos/900/400" alt="blog-cover" />
                </div>
                <div className='single-blog-body'>
                    <div className='single-blog-title'> {data.title}</div>
                    <div className='single-blog-content'>{data.main_text}</div>
                </div>
                <div className='single-blog-footer'>
                    <button
                        className='navbar-button'>
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className='navbar-button'>
                        Delete
                    </button>
                </div>
            </Row>
            {
                token &&
                <Comments data={data} handleFetch={handleFetch} />
            }
        </Container >
    )
}

export default SingleBlog

import './style.css'
import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fillSingleBlogAction } from '../../Redux/Actions/actions'
import Comments from './Comments'
import EditBlogModal from './EditBlogModal'

function SingleBlog() {

    const { id } = useParams()
    const token = localStorage.getItem('blogToken')
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const data = useSelector(state => state.selectedBlog.blog)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isModalShow, setIsModalShow] = useState(false)


    useEffect(() => {
        dispatch(fillSingleBlogAction(id))
    }, [])


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
            {
                isLoading ? 'loading' :
                    <Row className='single-blog-container'>
                        <div className='single-blog-cover'>
                            <img src="https://picsum.photos/900/400" alt="blog-cover" />
                        </div>
                        <div className='single-blog-body'>
                            <div className='single-blog-title'> {data.title}</div>
                            <div className='single-blog-content'>{data.main_text}</div>
                        </div>
                        {
                            <div className='single-blog-footer'>
                                <button
                                    onClick={() => setIsModalShow(true)}
                                    className='navbar-button'>
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className='navbar-button'>
                                    Delete
                                </button>
                            </div>
                        }
                    </Row>

            }
            {
                token &&
                <Comments data={data} />
            }
            <EditBlogModal
                show={isModalShow}
                onHide={() => setIsModalShow(false)}
                id={id}
            />
        </Container >
    )
}

export default SingleBlog

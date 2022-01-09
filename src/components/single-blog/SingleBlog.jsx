import './style.css'
import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Comments from './Comments'
import EditBlogModal from './EditBlogModal'
import { fillSingleBlogAction } from '../../Redux/Actions/actions'

function SingleBlog() {

    const { id } = useParams()
    const token = localStorage.getItem('blogToken')
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [isLoading, setIsLoading] = useState(false)
    const { loggedUser } = useSelector(state => state)
    const { blog } = useSelector(state => state.selectedBlog)
    const [isModalShow, setIsModalShow] = useState(false)

    useEffect(() => {
        dispatch(fillSingleBlogAction(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Container className='my-5'>
            {
                <Row className='single-blog-container'>
                    <div className='single-blog-cover'>
                        <img src="https://picsum.photos/900/400" alt="blog-cover" />
                    </div>
                    <div className='single-blog-body'>
                        <div className='single-blog-title'> {blog.title}</div>
                        <div className='single-blog-content'>{blog.main_text}</div>
                    </div>

                    {
                        blog.author && blog.author._id === loggedUser.user._id &&
                        <div className='single-blog-footer'>
                            {isLoading ? <ClockLoader color={'#353535'} size={20} /> :
                                <>
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
                                </>
                            }
                        </div>
                    }
                </Row>

            }
            {
                token &&
                <Comments data={blog && blog} />
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

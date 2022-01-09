import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"
import { useDispatch, useSelector } from 'react-redux'
import { fillSingleBlogAction } from '../../Redux/Actions/actions.js'


function EditBlogModal(props) {

    const newBlog = useSelector(state => state.selectedBlog.blog)
    const dispatch = useDispatch()
    const initialState = {
        title: newBlog.title,
        main_text: newBlog.main_text,
        category: newBlog.category,
    }

    const id = props.id
    const token = localStorage.getItem('blogToken')
    const BlogCategory = ['Technology', 'Science', 'Health', 'Sports', 'Entertainment', 'Business', 'Politics']

    const [blog, setBlog] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setBlog(initialState)
    }, [newBlog])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blog)
            })
            if (response.ok) {
                setBlog(initialState)
                setIsLoading(false)
                dispatch(fillSingleBlogAction(id))
                setError(false)
                props.onHide()

            } else {
                setError(true)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='blog-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                value={blog.title}
                                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                as="select"
                                value={blog.category}
                                onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                            >
                                {BlogCategory.map((category, index) => <option key={index}>{category}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className='my-2'>
                        <Form.Group as={Col}>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Main Text"
                                value={blog.main_text}
                                onChange={(e) => setBlog({ ...blog, main_text: e.target.value })}
                            />
                        </Form.Group>
                    </Row>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {
                    isLoading ?
                        <ClockLoader color={'#353535'} size={20} /> :
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                }
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EditBlogModal

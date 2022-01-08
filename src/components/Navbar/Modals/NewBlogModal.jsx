import React, { useState } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"
import { useDispatch } from 'react-redux'
import { fillDataBaseAction } from '../../../Redux/Actions/actions'

function NewBlogModal(props) {

    const initialState = {
        title: '',
        main_text: '',
        category: '',
    }

    const dispatch = useDispatch()
    const token = localStorage.getItem('blogToken')
    const BlogCategory = ['Technology', 'Science', 'Health', 'Sports', 'Entertainment', 'Business', 'Politics']

    const [blog, setBlog] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blog)
            })
            if (response.ok) {
                const data = await response.json()
                setBlog(initialState)
                setIsLoading(false)
                setError(false)
                dispatch(fillDataBaseAction())
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
                    New Blog
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
                            Sign In
                        </Button>
                }
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default NewBlogModal

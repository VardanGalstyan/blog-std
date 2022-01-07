import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"

function NewBlogModal(props) {

    const initialState = {
        title: '',
        main_text: '',
        category: '',
    }

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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign in
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={blog.category}
                            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                        >
                            {BlogCategory.map((category, index) => <option key={index}>{category}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Main Text"
                            value={blog.main_text}
                            onChange={(e) => setBlog({ ...blog, main_text: e.target.value })}
                        />
                    </Form.Group>
                    {isLoading ?
                        <ClockLoader color={'#212529'} loading={isLoading} size={20} /> :
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewBlogModal

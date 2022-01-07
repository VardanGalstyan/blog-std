import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"


function SignInModal(props) {

    const initialState = {
        email: '',
        password: ''
    }

    const [user, setUser] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                const data = await response.json()
                setUser(initialState)
                localStorage.setItem('blogToken', data.accessToken)
                setIsLoading(false)
                setError(false)
                props.onHide()
                props.handleFetch()
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
                <Modal.Title >
                    Sign in
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {isLoading ?
                    <ClockLoader color={'#535353'} size={20} /> :
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Sign In
                    </Button>
                }
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignInModal

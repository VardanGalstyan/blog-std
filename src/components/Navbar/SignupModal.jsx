import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"


function SignupModal(props) {

    const initialState = {
        nickname: '',
        email: '',
        password: ''
    }

    const token = localStorage.getItem('blogToken')

    const [user, setUser] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users`, {
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
                localStorage.setItem('blogNickName', data.savedPlayer.nickname)
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
            className='blog-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {token ? 'Sign in' : 'Sign up'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className='mb-2'>
                        <Form.Control
                            type="text"
                            placeholder="Enter Nickname"
                            value={user.nickname}
                            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group >
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
                        Sign Up
                    </Button>
                }
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignupModal

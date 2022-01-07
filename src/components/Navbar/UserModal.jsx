import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"

function UserModal(props) {

    const token = localStorage.getItem('blogToken')
    const { me } = props


    const [user, setUser] = useState({
        nickname: me.nickname,
        email: me.email,
        password: me.password
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                setIsLoading(false)
                setError(false)
                props.onHide()
                props.handlefetch()
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
                <Modal.Title>
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter Nickname"
                            value={user.nickname}
                            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            disabled
                            placeholder="Enter email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}

                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="current-password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </Form.Group>
                    {isLoading ?
                        <ClockLoader color={'#212529'} loading={isLoading} size={20} /> :
                        <Button variant="primary" type="submit">
                            Update
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

export default UserModal

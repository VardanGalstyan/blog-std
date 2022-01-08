import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ClockLoader } from "react-spinners"
import { useDispatch, useSelector } from 'react-redux'
import { fillDataBaseAction, userDataBaseAction } from '../../../Redux/Actions/actions'

function UserModal(props) {

    const token = localStorage.getItem('blogToken')
    const dispatch = useDispatch()
    const { nickname, email } = useSelector(state => state.loggedUser.user)

    const initialState = {
        nickname,
        email,
    }

    const [user, setUser] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async () => {
        try {
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
                dispatch(userDataBaseAction(token))
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

    const handleClose = () => {
        props.onHide()
        setUser(initialState)
    }


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="blog-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className='mb-2'>
                        <Form.Control
                            type="text"
                            placeholder="Enter Nickname"
                            value={user && user.nickname}
                            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Control
                            type="email"
                            disabled
                            placeholder="Enter email"
                            value={user && user.email}
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

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {isLoading ?
                    <ClockLoader color={'#535353'} size={20} /> :
                    <Button onClick={handleSubmit}>
                        Update
                    </Button>
                }
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserModal

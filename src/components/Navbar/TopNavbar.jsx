import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SignInModal from './SignInModal';
import SignupModal from './SignupModal';
import NewBlogModal from './NewBlogModal';
import UserModal from './UserModal'
import { useNavigate } from 'react-router-dom'
import './style.css'

function TopNavbar() {

    let token = localStorage.getItem('blogToken')
    let navigate = useNavigate()

    const [modalShow, setModalShow] = useState(false);
    const [onSignUpModalShow, setOnSignUpModalShow] = useState(false);
    const [createBlogModal, setCreateBlogModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [me, setMe] = useState({})

    useEffect(() => {
        handleFetch()
    }, [])


    const handleSignOut = () => {
        localStorage.removeItem('blogToken')
        navigate('/')

    }

    const handleFetch = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setMe(data)
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <Container className='navbar mt-5'>
            <Row>
                <Col xs={3} md={1} className='navbar-avatar-col'>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="user-avatar" />
                    </div>
                </Col>
                <Col md={7} className='navbar-title-col'>
                    <div
                        onClick={() => navigate('/')}
                        className='navbar-title'>
                        Blogs STD
                    </div>
                    <div
                        onClick={token ? () => setUserModal(true) : null}
                        className='navbar-username'>
                        {token ? me && me.nickname : 'Sign in to see more'}
                    </div>
                </Col>
                <Col xs={9} md={4} className='navbar-boarding-col'>
                    {
                        token ?
                            <>
                                <button
                                    onClick={() => setCreateBlogModal(true)}>
                                    New Blog
                                </button>
                                <button
                                    onClick={handleSignOut}>
                                    Sign Out
                                </button>
                            </>
                            :
                            <>
                                <button
                                    onClick={() => setModalShow(true)}
                                    handleFetch={() => handleFetch()}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setOnSignUpModalShow(true)}>
                                    Sign Up
                                </button>
                            </>
                    }
                </Col>
            </Row>

            <SignInModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <SignupModal
                show={onSignUpModalShow}
                onHide={() => setOnSignUpModalShow(false)}
            />
            <NewBlogModal
                show={createBlogModal}
                onHide={() => setCreateBlogModal(false)}
            />
            <UserModal
                show={userModal}
                onHide={() => setUserModal(false)}
                handlefetch={() => handleFetch()}
                me={me}
            />
        </Container>
    )
}

export default TopNavbar

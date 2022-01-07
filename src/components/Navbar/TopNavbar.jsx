import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SignInModal from './SignInModal';
import SignupModal from './SignupModal';
import NewBlogModal from './NewBlogMOdal';
import { useNavigate } from 'react-router-dom'
import './style.css'

function TopNavbar() {

    let token = localStorage.getItem('blogToken')
    let navigate = useNavigate()

    const [modalShow, setModalShow] = useState(false);
    const [onSignUpModalShow, setOnSignUpModalShow] = useState(false);
    const [createBlogModal, setCreateBlogModal] = useState(false);


    const handleSignOut = () => {
        localStorage.removeItem('blogToken')
        navigate('/')

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
                    <div className='navbar-title'>Blogs STD</div>
                    <div className='navbar-username'>username</div>
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
                                    onClick={() => setModalShow(true)} >
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
        </Container>
    )
}

export default TopNavbar

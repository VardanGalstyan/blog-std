import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SignInModal from './Modals/SignInModal';
import SignupModal from './Modals/SignupModal';
import NewBlogModal from './Modals/NewBlogModal';
import UserModal from './Modals/UserModal'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userDataBaseAction } from '../../Redux/Actions/actions';
import './style.css'

function TopNavbar() {

    let token = localStorage.getItem('blogToken')
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const me = useSelector(state => state.loggedUser.user)


    const [modalShow, setModalShow] = useState(false);
    const [onSignUpModalShow, setOnSignUpModalShow] = useState(false);
    const [createBlogModal, setCreateBlogModal] = useState(false);
    const [userModal, setUserModal] = useState(false);


    useEffect(() => {
        dispatch(userDataBaseAction(token))
    }, [])


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
                    <div
                        onClick={() => navigate('/')}
                        className='navbar-title'>
                        Blogs STD
                    </div>
                    <div className='navbar-username'>
                        {
                            token ?
                                me &&
                                <span
                                    onClick={token ? () => setUserModal(true) : null}
                                >
                                    {me.nickname}
                                </span> :
                                'Sign in to see more'
                        }
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
                me={me}
            />
        </Container>
    )
}

export default TopNavbar

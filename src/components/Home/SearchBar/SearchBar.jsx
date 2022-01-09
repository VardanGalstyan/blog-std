import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import './style.css'

function SearchBar(props) {


    return (
        <Container className='search-bar my-5'>
            <Row className='search-bar-row'>
                <Col className='search-menu-items' md={6}>
                    <Form.Group>
                        <Form.Control
                            as="select"
                            value={props.sortValue}
                            onChange={(e) => props.sortValueSet(e.target.value)}
                        >
                            <option value='0'>Sort</option>
                            <option value='title'>Title</option>
                            <option value='main_text'>Content</option>
                            <option value='createdAt'>Date</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col className='search-input' md={6}>
                    <input
                        type="text"
                        placeholder='Search'
                        value={props.searchValue}
                        onChange={(e) => props.searchValueSet(e.target.value)}
                    />
                </Col>

            </Row>
        </Container >
    )
}

export default SearchBar

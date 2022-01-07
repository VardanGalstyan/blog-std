import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function SearchBar(props) {



    return (
        <Container className='search-bar my-5'>
            <Row className='search-bar-row'>
                <Col className='search-menu-items' md={6}>
                    <span
                        onClick={() => props.setSort(!props.sort)}
                    >Sort</span>
                    {/* <span>bsl</span>
                    <span>Search</span>
                    <span>Search</span> */}
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
        </Container>
    )
}

export default SearchBar

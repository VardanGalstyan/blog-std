import './style.css'
import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import Card from './Cards/Card.jsx'
import SearchBar from './SearchBar/SearchBar.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { fillDataBaseAction } from '../../Redux/Actions/actions.js'
import { handleFilter } from '../../utils/index.js'

function Home() {

    const dispatch = useDispatch()
    const data = useSelector(state => state.allBlogs.blogs)
    const [searchValue, setSearchValue] = useState('')
    const [sortValue, setSortValue] = useState('title')


    useEffect(() => {
        dispatch(fillDataBaseAction())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    data.sort((a, b) => {
        if (sortValue !== '') {
            if (a[sortValue].toLowerCase() < b[sortValue].toLowerCase()) {
                return -1
            }
            if (a[sortValue].toLowerCase() > b[sortValue].toLowerCase()) {
                return 1
            }
            return 0
        } else {
            return ''
        }
    })



    return (
        <Container className='main-container-home'>
            <SearchBar
                searchValueSet={(e) => setSearchValue(e)}
                searchValue={searchValue}
                sortValueSet={(e) => setSortValue(e)}
                sortValue={sortValue}
            />
            <Row className='blog-card-holder'>
                {
                    data && handleFilter(data, searchValue).map(blog => <Card blog={blog} key={blog._id} />)
                }
            </Row>
        </Container>
    )
}

export default Home

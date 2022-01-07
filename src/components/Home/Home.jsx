import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import Card from './Cards/Card.jsx'
import SearchBar from './SearchBar/SearchBar.jsx'
import './style.css'

function Home() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [sort, setSort] = useState(false)


    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/blogs`)
            if (response.ok) {
                const json = await response.json()
                setData(json)
                setIsLoading(false)
            } else {
                setError(true)
                setIsLoading(false)
            }
        } catch (error) {
            setError(true)
            setIsLoading(false)
        }
    }

    const handleSort = (data, value) => {
        data.sort((a, b) => {
            if (value) {
                return a.title.localeCompare(b.title)
            } else {
                return b.title.localeCompare(a.title)
            }
        })
    }

    return (
        <Container>
            <SearchBar
                searchValueSet={(e) => setSearchValue(e)}
                searchValue={searchValue}
                sort={sort}
                setSort={(e) => setSort(e)}
            />
            <Row className='blog-card-holder'>
                {
                    data && data.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map(blog => <Card blog={blog} key={blog._id} />)
                }
            </Row>
        </Container>
    )
}

export default Home

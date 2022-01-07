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
    const [sortValue, setSortValue] = useState('title')


    useEffect(() => {
        handleFetch()
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



    const handleFilter = (data, value) => {
        return data.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase())
        })
    }

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

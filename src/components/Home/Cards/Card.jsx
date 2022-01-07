import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card(props) {

    const { blog } = props
    const date = new Date(blog.createdAt)
        .toDateString()
        .split(' ')
        .splice(1, 3)
        .join(' ')

    const navigate = useNavigate()

    return (
        <div className='blog-cards'>
            <div className='blog-card-header'>
                <img src="https://picsum.photos/200/300" alt="blog-card-avatar" />
            </div>
            <div className='blog-card-body'>
                <div className='blog-card-body-category'>
                    <span>{blog.category}</span>
                </div>
                <div
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className='blog-card-body-title'>
                    {blog.title}
                </div>
                <div className='blog-card-body-content'>
                    {blog.main_text}
                </div>
            </div>
            <div className='blog-card-footer'>
                <div className='blog-card-footer-avatar'>
                    <img src="https://picsum.photos/200/300" alt="user-avatar" />
                </div>
                <div className='blog-card-footer-name'>
                    {blog.author.nickname}
                </div>
                <div className='blog-card-footer-created'>
                    {date}
                </div>
            </div>
        </div>
    )
}

export default Card

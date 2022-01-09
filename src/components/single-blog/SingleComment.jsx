import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { fillSingleBlogAction } from '../../Redux/Actions/actions'

function SingleComment({ comment, id }) {

    const dispatch = useDispatch()
    const token = localStorage.getItem('blogToken')

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/users/comments/${comment._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                dispatch(fillSingleBlogAction(id))
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div key={comment._id} className='single-comment'>
            <div className='comment-main-header'>
                <span className='comment-header'>
                    <img className='mr-2' src="https://picsum.photos/200/300" alt="avatar-user" />
                    <span>{comment.author.nickname}</span>
                </span>
                <div className='comment-buttons'>
                    <span><MdModeEdit /></span>
                    <span onClick={handleDelete}><AiFillDelete /></span>
                </div>
            </div>
            <div className='px-2 py-2 comment-content'>
                {comment.comment}
            </div>
        </div>
    )
}

export default SingleComment

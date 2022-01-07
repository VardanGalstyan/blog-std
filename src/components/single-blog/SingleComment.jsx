import React from 'react'

function SingleComment({ comment }) {


    return (
        <div key={comment._id} className='single-comment'>
            <div>
                <span className='mr-2'>
                    <img src="https://picsum.photos/200/300" alt="avatar-user" />
                </span>
                <span>{comment.author.nickname}</span>
            </div>
            <div className='px-2 py-2'>{comment.comment}</div>
        </div>
    )
}

export default SingleComment

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from './Comment';

function IndividualPost(props) {
  const [post, setPost] = useState(null);
  const updatePost = () => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => console.error('Error fetching post:', error));
  };
  const { postId } = useParams();

  useEffect(() => {
    // Fetch the individual post based on its ID or some other identifier
    // You may need to modify the fetch URL to include the post ID
    updatePost();
  }, [postId, post]);

  return (
    <div>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <h4>By: {post.user.user_name}</h4>
          <p>{post.formatted_date}</p>
          <p>{post.text}</p>
          <hr />
          <h4>Comments</h4>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id}>
                <h5>{comment.user.user_name}</h5>
                <p>{comment.text}</p>
                <p>-- {comment.date}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No comments yet!</p>
          )}
          <AddComment updatePost={updatePost} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <a href="/">Home</a>
    </div>
  );
}

export default IndividualPost;

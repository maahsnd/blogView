import React, { useCallback, useState } from 'react';

function AddComment() {
  const [commentText, setCommentText] = useState('');
  const user = localStorage.getItem('user');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the comment text is not empty
    if (commentText.trim() === '') {
      return;
    }

    // Send the comment to the server/API
    const newComment = {
      text: commentText,
      user: user._id,
      post: postId
    };

    // Call the onCommentSubmit function passed as a prop
    onCommentSubmit(newComment);

    // Clear the comment text input
    setCommentText('');
  };

  return (
    <div>
      <h4>Add a Comment</h4>
      {user !== null ? (
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <br />
          <button type="submit">Submit Comment</button>
        </form>
      ) : (
        <div>
          <p>You must be logged in to add comments.</p>
          <a href="/user-auth">Log In / Sign Up</a>
        </div>
      )}
    </div>
  );
}

export default AddComment;

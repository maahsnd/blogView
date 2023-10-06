import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

function AddComment() {
  const [commentText, setCommentText] = useState('');
  const postId = useParams().postId;
  const localData = JSON.parse(localStorage.getItem('user'));
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the comment text is not empty
    if (commentText.trim() === '') {
      return;
    }

    const myheaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localData.token}`
    });
    const mybody = JSON.stringify({
      text: commentText,
      userId: localData.user._id,
      postId: postId
    });
    try {
      fetch(`http://localhost:3000/posts/${postId}/new-comment`, {
        method: 'POST',
        body: mybody,
        headers: myheaders
      }).then((response) => {
        return response.json();
      });
    } catch (err) {}
    // Clear the comment text input
    setCommentText('');
  };

  return (
    <div>
      <h4>Add a Comment</h4>
      {localData.user !== null ? (
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

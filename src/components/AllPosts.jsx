import { useState, useEffect } from 'react';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3000/posts/')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <header>
        <a href="/user-auth">User Auth</a>
      </header>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h3>
              <a href={'posts/' + post._id}>{post.title}</a>
            </h3>
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
            <hr />
          </div>
        ))
      ) : (
        <p>No posts yet!</p>
      )}
    </div>
  );
}

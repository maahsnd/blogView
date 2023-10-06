import AllPosts from './components/AllPosts';
import IndividualPost from './components/IndividualPost';
import UserAuth from './components/UserAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/posts/:postId"
          element={<IndividualPost user={user} />}
        ></Route>
        <Route
          path="/user-auth"
          element={<UserAuth updateUser={updateUser} />}
        ></Route>
        <Route path="/" element={<AllPosts />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

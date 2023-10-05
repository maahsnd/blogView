import AllPosts from './components/AllPosts';
import IndividualPost from './components/IndividualPost';
import UserAuth from './components/UserAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/posts/:postId" element={<IndividualPost />}></Route>
          <Route path="/user-auth" element={<UserAuth />}></Route>
          <Route path="/" element={<AllPosts />}></Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;

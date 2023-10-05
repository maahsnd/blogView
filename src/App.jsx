import AllPosts from './components/AllPosts';
import IndividualPost from './components/IndividualPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts/:postId" element={<IndividualPost />}></Route>
        <Route path="/" element={<AllPosts />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

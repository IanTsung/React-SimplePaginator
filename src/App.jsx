import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Pagination from './components/Pagination.jsx'
import Posts from './components/Posts.jsx'

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      console.log("res", res);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  //get index of posts for the current page
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='container mt-5'>
      <h1>My Blog</h1>
      <Posts posts = {currentPosts} loading = {loading} />
      <Pagination 
        postsPerPage = {postsPerPage}
        totalPosts ={posts.length}
        paginate = {paginate} 
        currentPage = {currentPage}
      />
    </div>
  );
}

export default App

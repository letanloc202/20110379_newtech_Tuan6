import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Typography, Box, List, ListItem, Drawer, ListItemIcon, ListItemText } from '@mui/material';
import IndexPage from './components/IndexPage';
import CreatePostPage from './components/CreatePostPage';
import EditPostPage from './components/EditPostPage';
import PostDetailPage from './components/PostDetailPage';
import Chip from '@mui/material/Chip';


// Make toggle Dark/ Light styles
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme, ThemeProvider } from '@mui/material';
import HomePage from './components/IndexPage';
import { v4 as uuidv4 } from 'uuid';

function BlogApp() {
  const [posts, setPosts] = useState([]);

  // Function to create a new post
  const handleCreatePost = (newPost) => {
    const postId = Date.now();
    const postWithId = { ...newPost, id: postId };
    setPosts([...posts, postWithId]);
  };

  // Function to delete a post
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Function to edit a post
  const handleEditPost = (postId, updatedPost) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, ...updatedPost };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Function to add a comment to a post
  const handleAddComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments, comment];
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  const handleHome = () => {
    <Link to="/">Home</Link>
  }

  const handleCreatPost = () => {
    <Link to="/create">Create Post</Link>
  }

  return (
    <Router>
      <header style={{ backgroundColor: '#333', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarExample01">
            <Box>
              <Typography style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>Lê Tấn Lộc</Typography>
              <Typography className="nav-link" style={{ fontSize: '20px', color: '#ddd', marginLeft: '20px' }}>Simple Blog</Typography>
            </Box>
          </div>
        </nav>
      </header>
      <Box sx={{ ml: 12 }}>
        <Box sx={{ mb: 2 }}>
          <Chip label="Home" component={Link} to="/" onClick={handleHome} color="primary" variant="contained" style={{ backgroundColor: '#2196f3', color: '#fff' }} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Chip label="Create Post" component={Link} onClick={handleCreatPost} to="/create" color="success" variant="contained" style={{ backgroundColor: '#4caf50', color: '#fff' }} />
        </Box>
      </Box>
      <Routes>
        <Route path="/" element={<IndexPage posts={posts} onDeletePost={handleDeletePost} />} />
        <Route path="/create" element={<CreatePostPage onCreatePost={handleCreatePost} />} />
        <Route path="/posts/:postId/edit" element={<EditPostPage posts={posts} onEditPost={handleEditPost} />} />
        <Route path="/posts/:postId" element={<PostDetailPage posts={posts} onDeletePost={handleDeletePost} onAddComment={handleAddComment} />} />
      </Routes>
    </Router>
  );
}



export default BlogApp;




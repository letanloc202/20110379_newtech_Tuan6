import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { Button, Typography, TextField, Box, Avatar } from "@mui/material";
function PostDetailPage({ posts, onDeletePost, onAddComment }) {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === Number(postId));
  const [comment, setComment] = useState('');
  const history = useNavigate();
  const handleDeletePost = () => {
    onDeletePost(post.id);
    history('/');
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() === '') {
      alert('Please enter a comment.');
      return;
    }
    const newComment = {
      content: comment,
    }

    onAddComment(post.id, newComment);
    setComment(" ");
  };

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <Box sx={{ ml: 12, mt: 5 }}>
      <Typography style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }} textAlign={'center'}>Title: {post.title}</Typography>
      <Typography style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }} textAlign={'center'} >Content: {post.content}</Typography>
      <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }} textAlign={'center'}>Comments</h3>
      {post.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <Box>
          {post.comments.map((comment, index) => (
            <Typography variant='p' key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src='.....'
                sx={{ width: 65, height: 65, mr: 2 }}

              />
              Guest:  {comment.content}
            </Typography>
          ))}
        </Box>
      )}
      <div>
        <TextField id="outlined-basic" sx={{ ml: 5, mt: 2 }} label="Comment" variant="outlined" onChange={handleCommentChange} />
        <Button variant="contained" sx={{ ml: 5, mt: 5 }} onClick={handleAddComment} >Add Comment</Button>

        <Button variant="contained" sx={{ ml: 5, mt: 5 }} onClick={handleDeletePost}>Delete Post</Button>
        <Button variant="contained" sx={{ ml: 5, mt: 5 }} onClick={() => history('/')} >Back to Home</Button>
      </div>
    </Box>
  );
}

export default PostDetailPage;
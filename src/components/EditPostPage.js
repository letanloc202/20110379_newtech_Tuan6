import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Grid, Card, CardContent, Typography, Box, CardActions, CardMedia, Button, Stack, TextField } from '@mui/material';



function EditPostPage({ posts, onEditPost }) {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const post = posts.find((post) => post.id === Number(postId));
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [postId, posts]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleEditPost = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter a title and content for the post.');
      return;
    }

    const updatedPost = {
      title,
      content,
    };

    onEditPost(Number(postId), updatedPost);

    navigate('/');
  };

  return (
    <div>
      <Box>
        <Typography variant='h4' fontWeight='bold' fontSize={32} color='green' textAlign='center' mb={4}>Edit Post</Typography>

        <Box sx={{ ml: 12, mr: 12 }}>
          <Stack sx={{ mb: 4 }} spacing={2}>
            <Typography variant='h5' color='purple'>Title</Typography>
            <TextField id="outlined-basic" sx={{ ml: 3 }} label="Title" variant="filled" value={title} onChange={handleTitleChange} />
          </Stack>

          <Stack spacing={2}>
            <Typography variant='h5' color='purple'>Content</Typography>
            <TextField
              sx={{ ml: 3 }} label="Content" variant="filled" value={content} onChange={handleContentChange}
              id="outlined-multiline-static"
              multiline
              rows={4}
            />
          </Stack>

          <Button variant="contained" sx={{ mt: 4, backgroundColor: 'blue', color: 'white' }} onClick={handleEditPost}>Save</Button>
          <Button variant="contained" sx={{ mt: 4, ml: 4, backgroundColor: 'red', color: 'white' }} onClick={() => { navigate('/') }}>Cancel</Button>
        </Box>
      </Box>
    </div>
  );
}


export default EditPostPage;
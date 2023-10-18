import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, TextField, Button } from '@mui/material'

function CreatePostPage({ onCreatePost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCreatePost = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter a title and content for the post.');
      return;
    }

    const newPost = {
      title,
      content,
      comments: [],
    };

    onCreatePost(newPost);

    setTitle('');
    setContent('');

    // return to the home page
    navigate('/');
  };

  return (
    <Box>
      <Typography variant='h4' fontWeight='bold' fontSize={32} color='red' textAlign='center' mb={4}>New Post</Typography>

      <Box sx={{ ml: 12, mr: 12 }}>
        <Stack sx={{ mb: 4 }} spacing={2}>
          <Typography variant='h5' color='green'>Title</Typography>
          <TextField id="outlined-basic" sx={{ ml: 3 }} label="Enter Title" variant="filled" onChange={handleTitleChange} />
        </Stack>

        <Stack spacing={2}>
          <Typography variant='h5' color='green'>Content</Typography>
          <TextField
            sx={{ ml: 3 }} label="Enter Content" variant="filled" onChange={handleContentChange}
            id="outlined-multiline-static"
            multiline
            rows={6}
          />
        </Stack>

        <Button variant="contained" sx={{ mt: 6, backgroundColor: 'blue', color: 'white', width: '50%', mx: 'auto' }} onClick={handleCreatePost}>Publish</Button>
        <Button variant="contained" sx={{ mt: 4, backgroundColor: 'gray', color: 'white', width: '50%', mx: 'auto' }} onClick={() => { navigate('/') }}>Cancel</Button>
      </Box>
    </Box>
  );
}

export default CreatePostPage;



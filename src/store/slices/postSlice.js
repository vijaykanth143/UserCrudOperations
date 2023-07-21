import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
  );
  console.log('fetch');
  return response.data;
});

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const {id, newTitle, newBody} = action.payload;
      const postToUpdate = state.posts.find(post => post.id === id);
      if (postToUpdate) {
        postToUpdate.title = newTitle;
        postToUpdate.body = newBody;
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post.id !== postId);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        state.dataFetched = true; // Set the dataFetched flag to true after successful fetch
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.dataFetched = false; // Set the dataFetched flag to false if fetch failed
      });
  },
});
export const {addPost, updatePost, deletePost} = postSlice.actions;
export default postSlice.reducer;

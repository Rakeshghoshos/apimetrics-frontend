// UserSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import user from './UserApi';

type userState = {
  user: any,
  error: any,
  status: string | null
}

type attributes = {
  emailId: string,
  password: string,
  token?: string
}

const initialState: userState = {
  user: [],
  error: null,
  status: null,
};

type getUserResponse = Awaited<ReturnType<typeof user.loginApi>>;

export const fetchUserAsync = createAsyncThunk<
  getUserResponse,
  attributes,
  { rejectValue: string }
>('user/fetchUser', async (values, { rejectWithValue }) => {
  try {
    const response = await user.loginApi(values);
    return response.data;
  } catch (error: any) {
    return rejectWithValue('Invalid email or password');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;

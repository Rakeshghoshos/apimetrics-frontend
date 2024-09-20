import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import user from './UserApi';

type userState= {
  user:any,
  error:any,
  status: string | null
}

type attributes={
  emailId:string,
  password:string,
    token?:string
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
      return rejectWithValue(error.message);
  }
});

export const signUpUserAsync = createAsyncThunk<
getUserResponse,
  attributes,
  { rejectValue: string }
>('user/signUpUser', async (values, { rejectWithValue }) => {
  try {
      const response = await user.signUpApi(values);
      return response.data;
  } catch (error: any) {
      return rejectWithValue(error.message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchUserAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUserAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(fetchUserAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(signUpUserAsync.pending, (state) => {
          state.status = 'loading';
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
      })
},
})

export const { } = userSlice.actions

export default userSlice.reducer

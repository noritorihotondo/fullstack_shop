import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRes } from '../api/types';

interface UserState {
  user: LoginRes | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<LoginRes>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;

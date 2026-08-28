import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
 reducers: {
  loginRequest: (state) => {
  },

  login: (state, action: PayloadAction<string>) => {
    state.isLoggedIn = true;
    state.user = action.payload;
  },

  logout: (state) => {
    state.isLoggedIn = false;
    state.user = null;
  },
},
});

export const {loginRequest, login, logout } = authSlice.actions;

export default authSlice.reducer;
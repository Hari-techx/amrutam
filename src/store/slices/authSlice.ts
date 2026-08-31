import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  hydrated: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  hydrated: false,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateRequest: (s) => {
      s.loading = true;
    },
    hydrate: (s, a: PayloadAction<string | null>) => {
      s.user = a.payload;
      s.isLoggedIn = Boolean(a.payload);
      s.hydrated = true;
      s.loading = false;
    },
    loginRequest: (
      s,
      a: PayloadAction<{ email: string; password: string }>,
    ) => {
      s.loading = true;
      s.error = null;
    },
    loginSuccess: (s, a: PayloadAction<string>) => {
      s.isLoggedIn = true;
      s.user = a.payload;
      s.loading = false;
      s.error = null;
    },
    loginFailure: (s, a: PayloadAction<string>) => {
      s.loading = false;
      s.error = a.payload;
    },
    logoutRequest: (s) => {
      s.loading = true;
    },
    logout: (s) => {
      s.isLoggedIn = false;
      s.user = null;
      s.loading = false;
    },
  },
});
export const {
  hydrateRequest,
  hydrate,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

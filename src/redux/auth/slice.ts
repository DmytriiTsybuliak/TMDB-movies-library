import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addFavorite,
  getGoogleOAuthUrlOP,
  loginUserOP,
  logoutUserOP,
  refreshPage,
  removeFavorite,
  signinGoogleOauthOP,
  signupUserOP,
} from './operations';
import { IfavoriteItem, user } from '../../types/types';

export interface authState {
  token: string | null;
  user: user | null;
  favorites: IfavoriteItem[] | null;
  isLoading: boolean | null;
  isLoggedIn: boolean | null;
  error: string | null;
}
export const initialState: authState = {
  token: null,
  user: null,
  favorites: null,
  isLoading: null,
  isLoggedIn: null,
  error: null,
};

const handleServerPending = (state: authState) => {
  state.isLoading = true;
  state.error = null;
};

const handleServerRejected = (state: authState, action: PayloadAction<string | unknown>) => {
  state.isLoading = false;
  // state.error = (action.payload as { message?: string })?.message || 'An error occurred';
  state.error = (action.payload as string) || 'An error occurred';
};

const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logoutAction(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      state.favorites = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserOP.pending, handleServerPending)
      .addCase(loginUserOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(loginUserOP.rejected, handleServerRejected)
      .addCase(logoutUserOP.pending, handleServerPending)
      .addCase(logoutUserOP.fulfilled, state => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
        state.favorites = null;
      })
      .addCase(logoutUserOP.rejected, handleServerRejected)
      .addCase(signupUserOP.pending, handleServerPending)
      .addCase(signupUserOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload;
        state.user = action.payload.user;
        state.favorites = action.payload.favorites;
      })
      .addCase(signupUserOP.rejected, handleServerRejected)
      .addCase(refreshPage.pending, handleServerPending)
      .addCase(refreshPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.favorites = action.payload;
      })
      .addCase(refreshPage.rejected, handleServerRejected)
      .addCase(signinGoogleOauthOP.pending, handleServerPending)
      .addCase(signinGoogleOauthOP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.favorites = action.payload.favorites;
      })
      .addCase(signinGoogleOauthOP.rejected, handleServerRejected)
      .addCase(getGoogleOAuthUrlOP.pending, handleServerPending)
      .addCase(getGoogleOAuthUrlOP.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getGoogleOAuthUrlOP.rejected, handleServerRejected)
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites?.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        if (state.favorites) {
          state.favorites = state.favorites.filter(
            item =>
              item.media_id !== action.payload.media_id ||
              item.contentType !== action.payload.contentType
          );
        }
      });
  },
});

export const setError = authSlice.actions.setError;
export const setAccessToken = authSlice.actions.setAccessToken;
export const logoutAction = authSlice.actions.logoutAction;
export const authReducer = authSlice.reducer;

// مثال على userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  id:null,
  isLoggedIn: false,
  role:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.name;
      state.id=action.payload.id;
      state.role=action.payload.role;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.id=null;
      state.role=null
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


// مثال على userSlice.js


const initialState = {
  user: null,
  id:null,
  isLoggedIn: false,
  role:null,
  status:null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
   adminLogin(state, action) {
      state.user = action.payload.name;
      state.id=action.payload.id;
      state.role=action.payload.role;
      state.isLoggedIn = true;
     
    },
    adminlogout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.id=null;
      state.role=null;
    },
  },
});

export const { adminLogin,adminlogout } = adminSlice.actions;
export default adminSlice.reducer;



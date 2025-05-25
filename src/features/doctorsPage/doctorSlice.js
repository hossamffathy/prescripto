import { createSlice } from "@reduxjs/toolkit";


// مثال على userSlice.js


const initialState = {
  user: null,
  id:null,
  isLoggedIn: false,
  role:null,
  status:null
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    doctorLogin(state, action) {
      state.user = action.payload.name;
      state.id=action.payload.id;
      state.role=action.payload.role;
      state.isLoggedIn = true;
      state.status=action.payload.status
    },
    doctorlogout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.id=null;
      state.role=null;
    },
  },
});

export const { doctorLogin, doctorlogout } = doctorSlice.actions;
export default doctorSlice.reducer;



import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/user/userSlice";
import doctorReducer from"./src/features/doctorsPage/doctorSlice"
import adminReducer from "./src/features/admin/adminSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    doctor:doctorReducer,
    admin:adminReducer
  },
});

export default store;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverURL } from "../server";
import { getCookieData } from "../utils/helperFunction";
import axios from "axios";

// const STATUSES = Object.freeze({
//   IDLE: "idle",
//   ERROR: "error",
//   LOADING: "loading",
// });
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    // status: STATUSES.IDLE,
  },

  // reducers: {
  //   setData(state, action) {
  //     state.data = action.payload || {};
  //   },
  // setStatus(state, action) {
  //   state.status = action.payload;
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload || {};
    });
  },
});
export const { setData } = userSlice.actions;
export default userSlice.reducer;

export const fetchUser = createAsyncThunk("user", async (userId) => {
  const response = await axios.post(`${serverURL}/auth/get-user-profile`, {
    userId: userId,
  });
  return response?.data?.profile;
});

// export function fetchUser(userId) {
//   return async function fetchUserThunk(dispatch) {
//     // dispatch(setStatus(STATUSES.LOADING));
//     try {
//       if (userId) {
//         const response = await axios.post(
//           `${serverURL}/auth/get-user-profile`,
//           {
//             userId: userId,
//           }
//         );

//         dispatch(setData(response?.data?.profile));
//         //   dispatch(setStatus(STATUSES.IDLE));
//       }
//     } catch (error) {
//       console.log(error);
//       //   dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

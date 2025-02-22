import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userSearchTerm: "", 
  postSearchTerm: "", 
};


const searchSlice = createSlice({
  name: "search",
  initialState, 
  reducers: {
    setUserSearchTerm: (state, action) => {
      state.userSearchTerm = action.payload;
    },
    setPostSearchTerm: (state, action) => {
      state.postSearchTerm = action.payload;
    },
  },
});

export const { setUserSearchTerm, setPostSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
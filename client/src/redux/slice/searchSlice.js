import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    search: null,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchGame: (state, action) => {
            state.search = action.payload;
        },
        searchRemove: (state) => {
            state.search = null
        }
    }
})

export const { searchGame ,searchRemove} = searchSlice.actions;

export const selectSearch = (state) => state.search.search;

export default searchSlice.reducer;
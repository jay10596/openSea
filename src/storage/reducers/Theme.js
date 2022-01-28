import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        color: 'light'
    },
    reducers: {
        setTheme: (state, action) => {
            state.color = action.payload.color
        }
    }
})

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
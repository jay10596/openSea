import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        color: 'dark'
    },
    reducers: {
        setTheme: (state, action) => {
            return action.payload.color
        }
    }
})

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        light: true
    },
    reducers: {
        setTheme: (state, action) => {
            return {
                light: action.payload.mode
            }
        }
    }
})

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
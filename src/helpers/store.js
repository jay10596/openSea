import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import themeReducer from "./reducers/Theme";
import openSeaReducer from "./reducers/OpenSea";

const Store = configureStore({
    reducer: {
        theme: themeReducer,
        openSea: openSeaReducer
    },
    middleware: [thunk]
})

export default Store
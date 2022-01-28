import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import themeReducer from "./reducers/Theme";
import marketplaceReducer from "./reducers/Marketplace";

const Store = configureStore({
    reducer: {
        theme: themeReducer,
        marketplace: marketplaceReducer
    },
    middleware: [thunk]
})

export default Store
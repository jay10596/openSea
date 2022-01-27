import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import marketplaceReducer from "./reducers/Marketplace";
import thunk from 'redux-thunk';

const Store = configureStore({
    reducer: {
        marketplace: marketplaceReducer
    },
    middleware: [thunk]
})

export default Store
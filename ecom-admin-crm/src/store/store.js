import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import { productApi } from './productApi.js';
import { collectionApi } from './collectionApi.js';
import { categoryApi } from './productCategoryApi.js';
import { typesApi } from './productTypeApi.js';
import { vendorsApi } from './vendorApi.js';
import { tagsApi } from './tagsApi.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        [productApi.reducerPath]: productApi.reducer,
        [collectionApi.reducerPath]: collectionApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [typesApi.reducerPath]: typesApi.reducer,
        [vendorsApi.reducerPath]: vendorsApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
    },
    middleware: getDefaultMiddleware()
        .concat(productApi.middleware)
        .concat(collectionApi.middleware)
        .concat(categoryApi.middleware)
        .concat(typesApi.middleware)
        .concat(vendorsApi.middleware)
        .concat(tagsApi.middleware)
});

export default store;

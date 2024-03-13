import { configureStore } from "@reduxjs/toolkit";
import { bookBuddyApi } from './bookBuddyApi'
import { userData } from './userData';

const store = configureStore({
    reducer: {
        bookBuddyApi: bookBuddyApi.reducer,
        userData: userData.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookBuddyApi.middleware),
});

export * from "./bookBuddyApi";
export * from "./userData";

export default store;

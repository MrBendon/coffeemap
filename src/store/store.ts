import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import coffeeSlice from "./coffeeSlice";
import pagecontrolSlice from "./pagecontrolSlice";
import { coffeeApi } from "./apis/apiSlice";

const store = configureStore({
  reducer: {
    pagecontrol: pagecontrolSlice,
    coffee: coffeeSlice,
    [coffeeApi.reducerPath]: coffeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coffeeApi.middleware),
});

setupListeners(store.dispatch);

export default store;

// 自動從 store 本身推斷出 `RootState` 和 `AppDispatch` 型態
export type RootState = ReturnType<typeof store.getState>;
// 類型推斷: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

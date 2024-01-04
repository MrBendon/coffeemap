import { configureStore } from "@reduxjs/toolkit";
import coffeeSlice from "./coffeeSlice";
import pagecontrolSlice from "./pagecontrolSlice";

const store = configureStore({
  reducer: {
    pagecontrol: pagecontrolSlice,
    coffee: coffeeSlice,
  },
});

export default store;

// 自動從 store 本身推斷出 `RootState` 和 `AppDispatch` 型態
export type RootState = ReturnType<typeof store.getState>;
// 類型推斷: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

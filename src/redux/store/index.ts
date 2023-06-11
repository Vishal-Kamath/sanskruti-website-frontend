import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/redux/slice/sidebar.slice";
import notificationReducer from "@/redux/slice/notification.slice";
import userReducer from "@/redux/slice/user.slice";
import loadingReducer from "@/redux/slice/loading.slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    loading: loadingReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

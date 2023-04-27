import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '@/slice/notification.slice';
import sidebarReducer from '@/slice/sidebar.slice';
import filterReducer from '@/slice/filter.slice';
import userReducer from '@/slice/user.slice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    sidebar: sidebarReducer,
    filter: filterReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

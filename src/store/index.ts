import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '@/slice/sidebar.slice';
import searchReducer from '@/slice/search.slice';
import notificationReducer from '@/slice/notification.slice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    sidebar: sidebarReducer,
    notification: notificationReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

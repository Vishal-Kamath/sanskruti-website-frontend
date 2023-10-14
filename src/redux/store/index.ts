import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/redux/slice/sidebar.slice";
import userReducer from "@/redux/slice/user.slice";
import loadingReducer from "@/redux/slice/loading.slice";
import notificationReducer from "@/redux/slice/notification.slice";
import cartReducer from "@/redux/slice/cart.slice";
import wishlistReducer from "@/redux/slice/wishlist.slice";
import categoryReducer from "@/redux/slice/category.slice";
import priceReducer from "@/redux/slice/price.slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    loading: loadingReducer,
    user: userReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    price: priceReducer,
    notification: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

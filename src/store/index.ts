import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import growthStagesSlice from "./reducers/growthStages";
import boostSlice from "./reducers/boost";
import coinSlice from "./reducers/coin";
import greetingSlice from "./reducers/greeting";

const store = configureStore({
   reducer: {
      growthStages: growthStagesSlice,
      boost: boostSlice,
      coin: coinSlice,
      greeting: greetingSlice,
   },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export default store;

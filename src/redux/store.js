import {configureStore} from "@reduxjs/toolkit";
import OrderSlice from "./features/order";
import UserState from "./features/user";
import multicompose from "./features/multicompose";

export const store = configureStore({
  reducer: {
    OrderReduce: OrderSlice,
    UserReduce: UserState,
    MultiCompose: multicompose
  }
});

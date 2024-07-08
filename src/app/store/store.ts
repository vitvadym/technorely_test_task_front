import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import companyReducer from "../features/company/companySlice";
import { loadState } from "../../helpers/persistState";

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
  },
  preloadedState: {
    user: loadState("user"),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

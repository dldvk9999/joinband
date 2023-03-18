import { configureStore } from "@reduxjs/toolkit";
import pageIndex from "./modules/mypage";

const store = configureStore({
    reducer: {
        index: pageIndex.reducer,
    },
    devTools: process.env.NODE_ENV === "development",
});

export default store;

// RootState 엑스포트
export type RootState = ReturnType<typeof store.getState>;

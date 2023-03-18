import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initalState 타입 정의
type StateType = {
    value: number;
};

// initalState 생성
const initialState: StateType = { value: 1 };

// 슬라이스생성
export const pageIndex = createSlice({
    name: "counter",
    initialState,
    reducers: {
        change: (state: StateType, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

// 액션을 export 해준다.
export const { change } = pageIndex.actions;

// 슬라이스를 export 해준다.
export default pageIndex;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initalState 타입 정의
type StateType = {
    [key: string]: Array<string>;
};

// initalState 생성
const initialState = { value: {} };

// 슬라이스생성
export const bandRooms = createSlice({
    name: "bandrooms",
    initialState,
    reducers: {
        change: (state, action: PayloadAction<StateType>) => {
            state.value = action.payload;
        },
    },
});

// 액션을 export 해준다.
export const { change } = bandRooms.actions;

// 슬라이스를 export 해준다.
export default bandRooms;

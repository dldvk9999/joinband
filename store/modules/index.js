import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import mypage from "../../pages/mypage";

const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;

        default:
            return combineReducers({ mypage })(state, action);
    }
};

export default rootReducer;

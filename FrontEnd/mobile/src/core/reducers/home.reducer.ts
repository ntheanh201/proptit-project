import { HomeState, HomeAction, LOAD_NEWFEED_SUCCESS, LOAD_NEWFEED_PROGRESS, LOAD_GROUP_FAIL } from "../types/home.types";
import { logD } from "../../common/LogTool";

let initialState: HomeState = {
    isLoadingNewFeed: false,

}

export default (state: HomeState = initialState, action: HomeAction): HomeState => {
    switch (action.type) {
        case LOAD_NEWFEED_PROGRESS:
            return ({
                ...state,
                isLoadingNewFeed: true,
            });
        case LOAD_NEWFEED_SUCCESS:
            logD("AppLog", "Reducer: Load NewFeed Success!")
            return ({
                ...state,
                isLoadingNewFeed: false,
                currentNewFeed: action.newfeeds
            });
        case LOAD_GROUP_FAIL:
            return ({
                ...state,
                isLoadingNewFeed: false,
            });
        default:
            return state;
    }
}
import { GroupState, GroupAction, LOAD_GROUP_PROGRESS, LOAD_GROUP_FAIL, LOAD_GROUP_SUCCESS } from "../types/group.types";
import { logD } from "../../common/LogTool";

const initialState: GroupState = {
    groups: [],
}

export default (state: GroupState = initialState, action: GroupAction): GroupState => {
    switch (action.type) {
        case LOAD_GROUP_PROGRESS:
            return ({
                ...state,
            });
        case LOAD_GROUP_FAIL:
            return ({
                ...state,
            });
        case LOAD_GROUP_SUCCESS:
            logD("App", "loading group success")
            return ({
                groups: action.groups
            });
        default:
            return state;
    }
}
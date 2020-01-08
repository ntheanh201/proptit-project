import {Dispatch} from 'redux';
import {
  LOAD_NEWFEED_SUCCESS,
  NewFeedAction,
  Post,
} from '../types/newfeed.types';
import {GroupAction, LOAD_GROUP_SUCCESS} from '../types/group.types';
import {logD} from '../../common/LogTool';

export const getGroups = (userID: String) => {
  return (dispatch: Dispatch<GroupAction>) => {
    logD('AppLog', 'get group');
    dispatch({
      type: LOAD_GROUP_SUCCESS,
      groups: [{name: 'Chung'}, {name: 'D17'}, {name: 'Android'}],
    });
  };
};

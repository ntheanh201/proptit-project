import {Dispatch} from 'redux';
import {
  LOAD_NEWFEED_SUCCESS,
  NewFeedAction,
  NewFeed
} from '../types/newfeed.types';
import { GroupAction, LOAD_GROUP_SUCCESS } from '../types/group.types';

export const getGroups = (userID: String) => {
  return (dispatch: Dispatch<GroupAction>) => {
    dispatch({type: LOAD_GROUP_SUCCESS, groups: [{name: "Chung"}, {name: "D17"}, {name: "Android"}]})
  }
}
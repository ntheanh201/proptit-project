import {Dispatch} from 'redux';
import {
  LOAD_GROUP_PROGRESS,
  LOAD_GROUP_FAIL,
  LOAD_GROUP_SUCCESS,
  LOAD_NEWFEED_FAIL,
  LOAD_NEWFEED_PROGRESS,
  LOAD_NEWFEED_SUCCESS,
  HomeAction
} from '../types/home.types';

import { Group } from '../types/group'
import { NewFeed } from '../types/newfeed';

export const getAllGroup = () => {
  return (dispatch: Dispatch<HomeAction>) => {
    var list: Group[] = [];
    list.push({name: "Chung"}, {name: "D17"}, {name: "D18"}, {name: "D19"});
    dispatch({type: LOAD_GROUP_SUCCESS, groups: list});
  };
};

export const getNewFeeds = (groupID: String) => {
  return (dispatch: Dispatch<HomeAction>) => {
    var list: NewFeed[] = [];
    list.push({content: "Hello World"});
    list.push({content: "Hello I'm Cong Khanh"});
    dispatch({type: LOAD_NEWFEED_SUCCESS, newfeeds: list});
  }
}
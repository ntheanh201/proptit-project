import {Dispatch} from 'redux';
import {
  LOAD_NEWFEED_SUCCESS,
  NewFeedAction,
  Post,
} from '../types/newfeed.types';

export const getNewFeeds = (groupID: string) => {
  return (dispatch: Dispatch<NewFeedAction>) => {
    var list: Post[] = [];
    list.push({content: 'Hello World'});
    list.push({content: "Hello I'm Cong Khanh"});
    dispatch({type: LOAD_NEWFEED_SUCCESS, newfeeds: list});
  };
};

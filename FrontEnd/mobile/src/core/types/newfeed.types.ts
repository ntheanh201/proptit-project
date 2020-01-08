import {Action} from 'redux';

export const LOAD_NEWFEED_SUCCESS = 'LOAD_NEWFEED_SUCCESS';
export const LOAD_NEWFEED_PROGRESS = 'LOAD_NEWFEED_PROGRESS';
export const LOAD_NEWFEED_FAIL = 'LOAD_NEWFEED_FAIL';

export interface NewFeedState {
  isLoadingNewFeed: boolean;
  currentNewFeed?: Post[];
}

export interface NewFeedAction extends Action<String> {
  newfeeds?: Post[];
}

export interface Post {
  id: String;
  userId: String;
  groupId: String;
  content: String;
  time: Date;
  type: Number;
}

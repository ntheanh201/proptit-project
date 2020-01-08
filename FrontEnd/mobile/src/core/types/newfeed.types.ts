import {Action} from 'redux';

export const LOAD_NEWFEED_SUCCESS = 'LOAD_NEWFEED_SUCCESS';
export const LOAD_NEWFEED_PROGRESS = 'LOAD_NEWFEED_PROGRESS';
export const LOAD_NEWFEED_FAIL = 'LOAD_NEWFEED_FAIL';

export interface NewFeedState {
  isLoadingNewFeed: boolean;
  currentNewFeed?: Post[];
}

export interface NewFeedAction extends Action<string> {
  newfeeds?: Post[];
}

export interface Post {
  id: string;
  userId: string;
  groupId: string;
  content: string;
  time: Date;
  type: Number;
}

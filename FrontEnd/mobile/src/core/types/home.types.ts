import { Action } from "redux";
import { NewFeed } from "./newfeed";
import { Group } from "./group";

export const LOAD_GROUP_SUCCESS = 'LOAD_GROUP_SUCCES';
export const LOAD_GROUP_PROGRESS = 'LOAD_GROUP_PROGRESS';
export const LOAD_GROUP_FAIL = 'LOAD_GROUP_FAIL';

export const LOAD_NEWFEED_SUCCESS = 'LOAD_NEWFEED_SUCCESS'
export const LOAD_NEWFEED_PROGRESS = 'LOAD_NEWFEED_PROGRESS'
export const LOAD_NEWFEED_FAIL = 'LOAD_NEWFEED_FAIL'


export interface HomeState {
    isLoadingNewFeed: boolean,
    currentNewFeed?: NewFeed[]
}

export interface HomeAction extends Action<String> {
    groups?: Group[],
    newfeeds?: NewFeed[],
}
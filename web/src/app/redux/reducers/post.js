/* eslint-disable camelcase */
import * as Actions from '../action-types'

const STATE_INIT = {
  posts: [
    {
      id: 4,
      content: 'khong lam ma doi co an thi chi co an dau b*** an c**\n',
      assigned_user_id: 1,
      assigned_user_avatar: '/media/7514383c-0273-4715-834b-260c1bf542a7.png',
      assigned_user_display_name: 'Nguyen The Anh',
      assigned_group_id: 1,
      assigned_group_name: 'D17',
      reaction_number: 0,
      comment_number: 0,
      time: '2020-04-15T15:50:00.607790Z',
      type: 2,
      photos: []
    }
  ],
  post: null
}

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case Actions.GET_ALL_POSTS:
      return { ...state, posts: payload }
    case Actions.GET_POST_BY_ID:
      return { ...state, post: payload }
    case Actions.GET_POSTS_BY_GROUP:
      return { ...state, posts: payload }
    case Actions.CREATE_POST:
      return { ...state, posts: payload }
    case Actions.UPDATE_POST:
      return { ...state, posts: payload }
    case Actions.DELETE_POST:
      return { ...state, posts: payload }
    default:
      return state
  }
}

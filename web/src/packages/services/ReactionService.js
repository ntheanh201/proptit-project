import axios from 'axios'

import environments from 'environments'

export const addReactionService = (postId, type = 1) => {
  return axios
    .post(`${environments.BASE_URL}reactions/`, {
      // eslint-disable-next-line camelcase
      post_id: postId,
      type
    })
    .then((response) => {
      return response.data.reaction_id
    })
    .catch((error) => {
      return null
    })
}

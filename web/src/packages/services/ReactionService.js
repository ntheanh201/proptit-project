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

export const deleteReactionService = (reactionId) => {
  return axios
    .delete(`${environments.BASE_URL}reactions/${reactionId}/`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return null
    })
}

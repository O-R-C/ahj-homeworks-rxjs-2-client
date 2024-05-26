import { SET_POSTS } from './actionTypes'

export const postsSet = (messages) => ({
  type: SET_POSTS,
  payload: messages,
})

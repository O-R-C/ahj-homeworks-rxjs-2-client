import { SET_POSTS } from '../actions/actionTypes'

const initialState = {
  posts: [],
}

/**
 * Reducer function for handling actions related to posts.
 *
 * @param {Object} state - The current state of the reducer.
 * @param {Object} action - The action object that is being dispatched.
 * @return {Object} The updated state after applying the action.
 */
export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      }
    default:
      return state
  }
}

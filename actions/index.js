import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
const IMGUR = { clientKey: "241264ba6ea98c2"
              , rootUrl: "https://api.imgur.com/3/"
              }

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// options accepts before, after, count, and limit as parameters
function fetchPosts(reddit, options) {

  let params = ''
  if (options) {
    if (options.before) params.concat(`?before=${options.before}`)
    if (options.after) params.concat(`?after=${options.after}`)
    if (options.limit) params.concat(`?limit=${options.limit}`)
    if (options.count) params.concat(`?count=${options.count}`)
  }

  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch( `https://www.reddit.com/r/${reddit}.json${params}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}

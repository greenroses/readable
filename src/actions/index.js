export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const LOAD_POST_FORM = 'LOAD_POST_FORM'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"
export const SET_CURRENT_POST = "SET_CURRENT_POST"
export const SET_CURRENT_COMMENT = "SET_CURRENT_COMMENT"

export function loadPosts({ posts }) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export function loadComments({ comments }) {
  return {
    type: LOAD_COMMENTS,
    comments
  }
}

export function loadCategories({ categories }) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}
export function addPost ({ id, timestamp, title, body, author, category, voteScore, deleted}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id,
  }
}

export function editPost ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function loadPostForm ({ data }) {
  return {
    type: LOAD_POST_FORM,
    data
  }
}

export function addComment ({ id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted}) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}

export function editComment ({ id, parentId, body, timestamp }) {
  return {
    type: EDIT_COMMENT,
    id,
    parentId,
    body,
    timestamp,
  }
}

export function deleteComment ({ id, parentId }) {
  return {
    type: DELETE_COMMENT,
    id,
    parentId,
  }
}

export function upvotePost ({ id, voteScore }) {
  return {
    type: UPVOTE_POST,
    id,
    voteScore,
  }
}

export function downvotePost ({ id, voteScore }) {
  return {
    type: DOWNVOTE_POST,
    id,
    voteScore,
  }
}

export function upvoteComment ({ id, voteScore, parentId }) {
  return {
    type: UPVOTE_COMMENT,
    id,
    voteScore,
    parentId,
  }
}

export function downvoteComment ({ id, voteScore, parentId }) {
  return {
    type: DOWNVOTE_COMMENT,
    id,
    voteScore,
    parentId,
  }
}

export function setCurrentPost ({ post }) {
  return {
    type: SET_CURRENT_POST,
    post
  }
}

export function setCurrentComment ({ comment }) {
  return {
    type: SET_CURRENT_COMMENT,
    comment
  }
}

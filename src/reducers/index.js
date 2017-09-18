import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { getAllposts, getCategories } from '../utils/api'

import {
  LOAD_POSTS,
  LOAD_COMMENTS,
  ADD_POST,
  ADD_COMMENT,
  EDIT_POST,
  LOAD_POST_FORM,
  EDIT_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
  UPVOTE_POST,
  DOWNVOTE_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  SET_CURRENT_POST,
  SET_CURRENT_COMMENT
} from '../actions'

const initialPostsState = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "11f0y6ziyjabvozdd253nd": {
    id: '11f0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'my Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  }
}

const initialCommentState = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
}


function posts (state = initialPostsState, action) {

  switch (action.type) {
    case LOAD_POSTS : // action.posts is an array of all post objects
      //console.log(action)
      //console.log(action.posts)
      /*return action.posts.reduce((result, currentValue) => {
        return result[currentValue.id] = currentValue;
      }, {})*/ //what is the bug of this reduce function?
      var posts = {};
      for (let i in action.posts) {
        posts[action.posts[i].id] = action.posts[i]
      }
      return posts

    case ADD_POST :
      var newpostmessage = Object.assign({}, action);
      delete newpostmessage.type;

      return {
        ...state,
        [action.id]: newpostmessage,
      }
    case DELETE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true,
        }
      }
    case EDIT_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.title,
          body: action.body,
        }
      }
    case LOAD_POST_FORM :
      return {
        data: action.data
      }
    case UPVOTE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
    case DOWNVOTE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
    default:
      return state
  }
}

function currentPost (state ={}, action) {
  switch (action.type) {
    case SET_CURRENT_POST :
      return action.post
    default:
        return state
  }
}

function currentComment (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_COMMENT :
      return action.comment
    default:
      return state
  }
}

function comments (state = initialCommentState, action) {

  switch (action.type) {
    case LOAD_COMMENTS :
      var comments = {};
      for (let i in action.comments) {
        comments[action.comments[i].id] = action.comments[i]
      }
      return comments
    case ADD_COMMENT :
      var newcommentmessage = Object.assign({}, action);
      delete newcommentmessage.type;

      return {
        ...state,
        [action.id]: newcommentmessage,
      }
    case DELETE_COMMENT :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true,
        }
      }
    case UPVOTE_COMMENT :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
    case DOWNVOTE_COMMENT :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  currentPost,
  currentComment,
  form: formReducer // you have to pass formReducer under 'form' key
})

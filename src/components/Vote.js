import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { setCurrentPost, loadPosts, addPost, deletePost, editPost, addComment, deleteComment, upvotePost, downvotePost } from '../actions'
import { connect } from 'react-redux'
import '../index.css';
import upvote from '../images/upvote.png';
import downvote from '../images/downvote.png'; // Tell Webpack this JS file uses this image


class Vote extends Component {
  upvotePostFuncton = (postId, postVotescore) => {
    fetch(`http://localhost:3001/posts/${postId}`, { method: "POST", body: JSON.stringify({option: "upVote"}), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          id: postId,
          voteScore: data.voteScore
        }
        this.props.upvotePost(obj);   //reducer
        this.props.setCurrentPost({post: data});  //otherwise, the postdetail won't reflect the change since the currentpost data is outdated
      })
    })
  }

  downvotePostFuncton = (postId, postVotescore) => {
    fetch(`http://localhost:3001/posts/${postId}`, { method: "POST", body: JSON.stringify({option: "downVote"}), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          id: postId,
          voteScore: data.voteScore
        }
        this.props.downvotePost(obj);   //reducer
        this.props.setCurrentPost({post: data});
      })
    })
  }


  render() {
    return (
      <div className="vote">
        <div>
          <img className="upvote" src={upvote} alt="Upvote" onClick={()=>{this.upvotePostFuncton(this.props.scorepost.id, this.props.scorepost.voteScore)}} />
        </div>
        <div>
          <img className="downvote" src={downvote} alt="Downvote" onClick={()=>{this.downvotePostFuncton(this.props.scorepost.id, this.props.scorepost.voteScore)}} />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments, currentPost }) {
  return {
    posts: Object.keys(posts).map((id) => ( // turn posts from object to array
      posts[id]
    )),
    currentPost: currentPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    upvotePost: (data) => dispatch(upvotePost(data)),
    downvotePost: (data) => dispatch(downvotePost(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    setCurrentPost: (data) => dispatch(setCurrentPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote)

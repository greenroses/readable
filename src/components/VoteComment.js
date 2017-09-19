import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { upvoteComment, downvoteComment, setCurrentComment } from '../actions'
import { connect } from 'react-redux'
import '../index.css';
import upvote from '../images/upvote.png';
import downvote from '../images/downvote.png'; // Tell Webpack this JS file uses this image


class VoteComment extends Component {
  upvoteCommentFuncton = (commentId) => {
    fetch(`http://localhost:3001/comments/${commentId}`, { method: "POST", body: JSON.stringify({option: "upVote"}), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          id: commentId,
          parentId: data.parentId,
          voteScore: data.voteScore
        }
        this.props.upvoteComment(obj);   //reducer
        this.props.setCurrentComment({comment: data});
        console.log("upvote ran")
        console.log("current votescore is")
        console.log(data.voteScore)
        console.log("currentComment")
        console.log(this.props.currentComment)
      })
    })
  }

  downvoteCommentFuncton = (commentId) => {
    fetch(`http://localhost:3001/comments/${commentId}`, { method: "POST", body: JSON.stringify({option: "downVote"}), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          id: commentId,
          parentId: data.parentId,
          voteScore: data.voteScore
        }
        this.props.downvoteComment(obj);   //reducer
        this.props.setCurrentComment({comment: data});
      })
    })
  }


  render() {
    return (
      <div className="vote">
        <div>
          <img className="upvote" src={upvote} alt="Upvote" onClick={()=>{this.upvoteCommentFuncton(this.props.scorecomment.id)}} />
        </div>
        <div>
          <img className="downvote" src={downvote} alt="Downvote" onClick={()=>{this.downvoteCommentFuncton(this.props.scorecomment.id)}} />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, currentPost, currentComment, comments }) {
  console.log({ comments, currentPost })

  return {
    posts: Object.keys(posts).map((id) => ( // turn posts from object to array
      posts[id]
    )),
    currentPost: currentPost,
    currentComment: currentComment,
    comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upvoteComment: (data) => dispatch(upvoteComment(data)),
    downvoteComment: (data) => dispatch(downvoteComment(data)),
    setCurrentComment: (data) => dispatch(setCurrentComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteComment)

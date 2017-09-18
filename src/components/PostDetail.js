import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import { loadPosts, addPost, deletePost, editPost, addComment, deleteComment, upvotePost, downvotePost, setCurrentPost, setCurrentComment } from '../actions'
import { Grid, Row, Col, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import '../index.css';
import Vote from './Vote.js';
import VoteComment from './VoteComment'
import PostEditForm from './PostEditForm'
import ListPosts from './ListPosts'

class PostDetail extends Component {
  deleteCommentFunction = (commentId) => {
    fetch(`http://localhost:3001/comments/${commentId}`, { method: "DELETE", headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
        var obj = {
          id: commentId,
        }
        this.props.deleteComment(obj);   //reducer
    })
  }

  editCommentFunction = (comment_to_edit) => {
    this.props.setCurrentComment({comment: comment_to_edit});
    this.props.history.push(`/${this.props.currentComment.id}/editcomment`);
  }

  render() {
    const { currentPost, currentComment, comments, posts} = this.props;
    console.log("this is comments");
    console.log(comments);
    console.log("this is currentPost");
    console.log(currentPost);
    let filteredcomment = comments.filter((comment) => (comment.parentId===currentPost.id));
    console.log("this is filtered comments");
    console.log(filteredcomment);
    return (
      <div>
        <Link to="/" >Back to homepage</Link>
        <div className="posts">
          <ListPosts listpost= { currentPost }/>  {/*!!!make sure the currentPost stores the post data after edit or vote*/}
        </div>

        <div className="comments">
          {comments.filter((comment)=>(comment.parentId===currentPost.id)&&(comment.deleted===false)).map((comment)=>(
            <Row>
              <Col md={12} className="comment">
                <p>{comment.body}</p>
                <p>author: {comment.author}, timestamp: {comment.timestamp}</p>
                <VoteComment scorecomment={comment}/>
                <p>voteScore: {comment.voteScore}</p>
                <div class="btn-toolbar">
                  <Button bsStyle="warning" onClick={() => {this.editCommentFunction(comment)}}>edit</Button>
                  <Button bsStyle="warning" onClick={() => {this.deleteCommentFunction(comment.id)}}>delete</Button>
                </div>
              </Col>
            </Row>
          ))}
        </div>

      </div>
    )
  }
}

function mapStateToProps ({ posts, currentPost, currentComment, comments }) {
  return {
    posts: Object.keys(posts).map((id) => ( // turn posts from object to array
      posts[id]
    )),
    currentPost: currentPost,
    currentComment: currentComment,
    comments: Object.keys(comments).map((id) => (
      comments[id]
    )),
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
    setCurrentPost: (data) => dispatch(setCurrentPost(data)),
    setCurrentComment: (data) => dispatch(setCurrentComment(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))

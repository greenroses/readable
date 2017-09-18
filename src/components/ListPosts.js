import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import { loadPosts, loadComments, addPost, deletePost, editPost, addComment, deleteComment, upvotePost, downvotePost, setCurrentPost } from '../actions'
import { Grid, Row, Col, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import '../index.css';
import Vote from './Vote.js';
import PostEditForm from './PostEditForm'


class ListPosts extends Component {
  deletePostFunction = (postId) => {
    fetch(`http://localhost:3001/posts/${postId}`, { method: "DELETE", headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
        var obj = {
          id: postId,
        }
        this.props.deletePost(obj);   //reducer
    })
  }


  componentDidMount() {
    fetch(`http://localhost:3001/posts/${this.props.listpost.id}/comments`, { headers: {'Authorization': 'whatever-you-want'}})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: 'LOAD_COMMENTS',
          comments: data
        }
        this.props.loadComments(obj);
        console.log("this is data.length")
        console.log(data.length);
      })
    })
  }


  getNumofComments = (postId) => {
    return this.props.comments.filter((comment)=>(comment.parentId===postId)&&(comment.deleted===false)).length;
  }

  editPostFunction = (post_to_edit) => {
    this.props.setCurrentPost({post: post_to_edit});
    this.props.history.push("/editpost");
  }

  openPostDetail = (post_to_open) => {
    this.props.setCurrentPost({post: post_to_open});
    this.props.history.push(`/${post_to_open.category}/${post_to_open.id}`);
  }

  createComment = (parent_post) => {
    this.props.setCurrentPost({post: parent_post});
    this.props.history.push(`/${parent_post.category}/${parent_post.id}/addcomment`);
  }


  render() {
    let post = this.props.listpost;
    let numofComments = this.getNumofComments(post.id);

    return (
      <div>
        <Row>
          <Col md={12} className="post">
            <h3 onClick={() => {this.openPostDetail(post)}}>{post.title}</h3>
            <p>{post.body}</p>
            <p>author: {post.author}, timestamp: {post.timestamp}</p>
            <p>comments: {numofComments}</p>
            <Vote scorepost={post}/>
            <p>voteScore: {post.voteScore}</p>
            <div class="btn-toolbar">
              <Button bsStyle="success" onClick={() => {this.createComment(post)}}>add a comment</Button>
              <Button bsStyle="warning" onClick={() => {this.editPostFunction(post)}}>edit</Button>
              <Button bsStyle="warning" onClick={() => {this.deletePostFunction(post.id)}}>delete</Button>
            </div>
          </Col>
        </Row>
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
    loadComments: (data) => dispatch(loadComments(data)),
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    setCurrentPost: (data) => dispatch(setCurrentPost(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts))

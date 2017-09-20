import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPosts, loadComments, addPost, editPost, editComment, setCurrentPost, setCurrentComment, deletePost, addComment, deleteComment, setSortProperty } from '../actions'
import { Route, Link, withRouter } from 'react-router-dom'
import PostForm from './PostForm.js'
import PostEditForm from './PostEditForm'
import ListPosts from './ListPosts'
import { getAllposts, getCategories } from '../utils/api'
import PostDetail from './PostDetail'
import CommentForm from './CommentForm'
import CommentEditForm from './CommentEditForm'
import { Grid, Row, Col, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import '../App.css';
import '../index.css';


class App extends Component {


  submit = (values) => {
    console.log(values);
    var x = Object.assign({}, values);
    x.id = this.uniqueId();
    x.timestamp = Date.now();
    x.deleted = false;
    x.voteScore = 1;
    console.log("this is x object");
    console.log(x);
    this.addNewpostFunction(x);
    console.log("here is the states after submit form");
    console.log(this.props.posts);

    this.props.history.push("/"); //the easiest way to programmatically navigate using react router v4
  }

  submiteditpost = (values) => {
    var x = Object.assign({}, values);
    x.id = this.props.currentPost.id;
    this.editPostFunction(x);
    this.props.history.push(`/${this.props.currentPost.category}/${this.props.currentPost.id}`);
  }

  submitEditComment = (values) =>{
    var x = Object.assign({}, values);
    x.timestamp = Date.now();
    this.editCommentFunction(x);
    this.props.history.push(`/${this.props.currentPost.category}/${this.props.currentPost.id}`);
  }

  submitComment = (values) => {
    console.log(values);
    var x = Object.assign({}, values);
    x.id = this.uniqueId();
    x.timestamp = Date.now();
    x.deleted = false;
    x.voteScore = 1;
    x.parentId = this.props.currentPost.id;
    x.parentDeleted = false;
    this.addNewCommentFunction(x);
    this.props.history.push(`/${this.props.currentPost.category}/${this.props.currentPost.id}`);
  }

  componentDidMount() {
    fetch("http://localhost:3001/posts", { headers: {'Authorization': 'whatever-you-want'}})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: 'LOAD_POSTS',
          posts: data
        }
        this.props.loadPosts(obj);
      })
    })
  }

  addNewpostFunction = (obj) => {
    fetch("http://localhost:3001/posts", { method: "POST", body: JSON.stringify(obj), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        this.props.addPost(data);   //reducer
      })
    })
  }

  addNewCommentFunction = (obj) => {
    fetch("http://localhost:3001/comments", { method: "POST", body: JSON.stringify(obj), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        this.props.addComment(data);
      })
    })
  }

  editPostFunction = (obj) => {
    fetch(`http://localhost:3001/posts/${this.props.currentPost.id}`, { method: "PUT", body: JSON.stringify(obj), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        var y = {
          id: data.id,
          title: data.title,
          body: data.body,
        }
        this.props.editPost(y);   //reducer
        this.props.setCurrentPost({post: data});  //!!!need to update the content of the currentpost since the orignial post has been editted
      })
    })
  }

  editCommentFunction = (obj) => {
    fetch(`http://localhost:3001/comments/${this.props.currentComment.id}`, { method: "PUT", body: JSON.stringify(obj), headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }})
    .then((resp) => {
      resp.json().then((data) => {
        var y = {
          id: data.id,
          timestamp: data.timestamp,
          body: data.body,
          parentId: data.parentId
        }
        this.props.editComment(y);   //reducer
        this.props.setCurrentComment({comment: data});   //This works
      })
    })
  }

  uniqueId = () => {
    return '_' + Math.random().toString(36).substr(2,9)
  }

  dynamicSort = (a, b) => {
    if (this.props.sortProperty === "voteScore") {
      if (a.voteScore < b.voteScore)
        return 1;
      if (a.voteScore > b.voteScore)
        return -1;
      return 0;
    }
    if (this.props.sortProperty === "timestamp") {
      if (a.timestamp < b.timestamp)
        return 1;
      if (a.timestamp > b.timestamp)
        return -1;
      return 0;
    }
  }


  render() {
    const { posts, comments, currentPost, currentComment, loadPosts, loadComments, addPost, deletePost } = this.props
    const categories = ['react', 'redux', 'udacity']


    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <div>
            <div className="App-header">
              <h2>Welcome to Readable</h2>
              <p><a href="/newpost">Add new post</a></p>
              <button onClick={()=>{this.props.setSortProperty({property: "voteScore"})}}>sort by voteScore</button>
              <button onClick={()=>{this.props.setSortProperty({property: "timestamp"})}}>sort by timestamp</button>
            </div>
            <Grid>
              <Row className="show-grid">
                {categories.map((category) => (
                  <Col md={4} className="category">
                    <h1><a href={`/${category}`}>{category}</a></h1>  {/* need { } in {`/${category}`} */}
                  </Col>
                ))}
              </Row>
              {posts.filter(post => post.deleted===false).sort(this.dynamicSort).map((post) => (
                <ListPosts listpost = {post} />
              ))}
            </Grid>
          </div>
        )}/>

        {categories.map((category) => (
          <Route exact path={`/${category}`} render={() => (
            <div>
              <Link to="/" className="back-to-homepage">Back to homepage</Link>
              <Grid>
                <Row className="show-grid">
                  <Col md={12} className="category">
                    <h1>{category}</h1>
                    <p><a href="/newpost">Add new post</a></p>
                    <button onClick={()=>{this.props.setSortProperty({property: "voteScore"})}}>sort by voteScore</button>
                    <button onClick={()=>{this.props.setSortProperty({property: "timestamp"})}}>sort by timestamp</button>
                  </Col>
                </Row>
                {posts.filter(post => post.category===`${category}`).filter(post => post.deleted===false).sort(this.dynamicSort).map(post => (
                  <ListPosts listpost= {post}/>
                ))}
              </Grid>
            </div>
          )}/>
        ))}

        <Route path="/newpost" render={() => (
          <PostForm onSubmit={this.submit} />
        )}/>

        <Route path="/editpost" render={() => (
          <PostEditForm onSubmit={this.submiteditpost} />
        )}/>

        <Route path={`/${this.props.currentPost.category}/${this.props.currentPost.id}`} render={() => (
          <PostDetail />
        )}/>

        <Route path={`/${this.props.currentPost.category}/${this.props.currentPost.id}/addcomment`} render={() => (
          <CommentForm onSubmit={this.submitComment} />
        )}/>

        <Route path={`/${this.props.currentComment.id}/editcomment`} render={() => (
          <CommentEditForm onSubmit={this.submitEditComment} />
        )}/>

      </div>
    );
  }
}

function mapStateToProps ({ posts, currentPost, currentComment, comments, sortProperty }) {
  return {
    posts: Object.keys(posts).map((id) => ( // turn posts from object to array
      posts[id]
    )),
    currentPost: currentPost,
    currentComment: currentComment,
    comments,
    sortProperty,
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
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    setCurrentPost: (data) => dispatch(setCurrentPost(data)),
    setCurrentComment: (data) => dispatch(setCurrentComment(data)),
    setSortProperty: (data) => dispatch(setSortProperty(data)),
  }
}

export default withRouter(connect( // use withRouter to ensure react router works with redux
  mapStateToProps,
  mapDispatchToProps
)(App))

import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { setCurrentPost as setCurrentPost } from '../actions'
import { Route, Link, withRouter } from 'react-router-dom'



let PostEditForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Link to="/" >Back to homepage</Link>
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" placeholder="Title"/>
      </div>

      <div>
        <label htmlFor="body">Type in here</label>
        <Field name="body" component="input" type="text" placeholder="Type in here..."/>
      </div>
      <div>
        <button type="submit">Save edit</button>
      </div>
    </form>
  )
}


PostEditForm = reduxForm({
  form: 'edit_post' //a unique name for the form
})(PostEditForm)

//connect() to any reducers that you wish to connect to
PostEditForm = connect(
  state => ({
    initialValues: {
      title: state.currentPost.title,
      body: state.currentPost.body,
    }
  }),
  { setCurrentPost: setCurrentPost}
)(PostEditForm)


export default PostEditForm

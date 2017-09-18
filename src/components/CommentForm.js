import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Route, Link, withRouter } from 'react-router-dom'


let CommentForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        
        <h1>Create a new comment</h1>
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Field name="author" component="input" type="text" placeholder="Author"/>
      </div>
      <div>
        <label htmlFor="body">Type in here</label>
        <Field name="body" component="input" type="text" placeholder="Type in here..."/>
      </div>
      <div>
        <button type="submitComment">Submit</button>
      </div>
    </form>
  )
}


CommentForm = reduxForm({
  form: 'new_comment' //a unique name for the form
})(CommentForm)


export default CommentForm

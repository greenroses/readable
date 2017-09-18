import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { setCurrentComment as setCurrentComment } from '../actions'
import { Route, Link, withRouter } from 'react-router-dom'



let CommentEditForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Link to="/" >Back to homepage</Link>
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


CommentEditForm = reduxForm({
  form: 'edit_comment' //a unique name for the form
})(CommentEditForm)

//connect() to any reducers that you wish to connect to
CommentEditForm = connect(
  state => ({
    initialValues: {
      body: state.currentComment.body,
    }
  }),
  { setCurrentComment: setCurrentComment}
)(CommentEditForm)


export default CommentEditForm

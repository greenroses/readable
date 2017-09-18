import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Route, Link, withRouter } from 'react-router-dom'


let PostForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Link to="/" >Back to homepage</Link>
      <h1>Create a new Post</h1>
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" placeholder="Title"/>
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Field name="author" component="input" type="text" placeholder="Author"/>
      </div>
      <div>
        <label>Category</label>
        <div>
          <Field name="category" component="select">
            <option />
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="body">Type in here</label>
        <Field name="body" component="input" type="text" placeholder="Type in here..."/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}


PostForm = reduxForm({
  form: 'new_post' //a unique name for the form
})(PostForm)

//Decorate with connect to read form values
//selector programmed but not really used in this app because I don't know how to pass the selected data to other functions
const selector = formValueSelector('PostForm')
PostForm = connect(
  state => {
    const title = selector(state, 'title')
    const body = selector(state, 'body')
    const author = selector(state, 'author')
    const category = selector(state, 'category')
    return {
      id: 1000,
      timestamp: Date.now(),
      deleted: false,
      voteScore: 1,
      title: `${title}`,
      body: `${body}`,
      author: `${author}`,
      category: `${category}`
    }
  }
)(PostForm)

export default PostForm

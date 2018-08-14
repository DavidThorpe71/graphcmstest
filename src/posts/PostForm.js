import React, { Component } from 'react';

class PostForm extends Component {
  state = {
    title: "",
    body: ""
  }

  handleInput = (e) => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({
      ...formData
    })
  }

  render() {
    const { onSubmit } = this.props;
    const { title, body } = this.state;
    return (
      <form onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: {
            title,
            body
          }
        }).then(() => {
          this.setState({
            title: "",
            body: ""
          })
        }).catch((err) => {
          console.log(err)
        })
      }}>
        <input
          type="text"
          onChange={this.handleInput}
          value={title}
          name="title"
          placeholder="title" />
        <textarea
          type="text"
          onChange={this.handleInput}
          value={body}
          name="body"
          placeholder="body" />
        <button>Submit</button>
      </form>
    );
  }
}

export default PostForm;
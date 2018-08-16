import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    post: PropTypes.object
  }

  static defaultProps = {
    post: {},
    onSuccess: () => null
  }

  state = {
    title: this.props.post.title || "",
    body: this.props.post.body || "",
    id: this.props.post.id || ""
  }

  handleInput = (e) => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({
      ...formData
    })
  }

  render() {
    const { onSubmit, onSuccess } = this.props;
    const { title, body, id } = this.state;
    return (
      <form onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: {
            title,
            body,
            id
          }
        }).then(() => {
          onSuccess()
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
        <button className="button">Submit</button>
      </form>
    );
  }
}

export default PostForm;
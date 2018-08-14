import React, { Component } from 'react';

class PostForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="title" />
        <textarea type="text" placeholder="body" />
        <button>Submit</button>
      </form>
    );
  }
}

export default PostForm;
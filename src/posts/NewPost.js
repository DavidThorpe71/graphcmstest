import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PostForm from './PostForm';

const NEW_POST = gql`
  mutation createPost($title: String, $body: String) {
    createPost(data: {
      status: PUBLISHED
      title: $title
      body: $body
    }) {
      title
      body
      id
    }
  }
`;

class NewPost extends Component {
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
    const { title, body } = this.state;
    return (
      <div>
        <h1>New post</h1>
        <Mutation
          mutation={NEW_POST}
          variables={{ title, body }}
        >
          {(createPost) => (

            <form onSubmit={e => {
              e.preventDefault();
              createPost().then(() => {
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
          )
          }
        </Mutation>
        {/* <PostForm /> */}
      </div>
    );
  }
}

export default NewPost;
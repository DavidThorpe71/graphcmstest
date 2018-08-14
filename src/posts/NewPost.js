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
  render() {
    return (
      <div>
        <h1>New post</h1>
        <Mutation
          mutation={NEW_POST}
        >
          {(createPost) => (
            <PostForm onSubmit={createPost} />
          )
          }
        </Mutation>
      </div>
    );
  }
}

export default NewPost;
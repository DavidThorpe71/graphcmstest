import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';

const POSTS_QUERY = gql`
query allPosts{
  posts {
    id
    title
    body
  }
}
`;

class Posts extends Component {
  render() {
    return (
      <div>
        <ul>
          <Query query={POSTS_QUERY}>
            {({ loading, data }) => {
              if (loading) return <p>Loading data...</p>;
              const { posts } = data;
              return posts.map(post => {
                return (
                  <li key={post._id}>
                    <Link to={`/post/${post.id}`}>
                      {post.title}
                    </Link>
                  </li>
                )
              })
            }}
          </Query>
        </ul>
      </div>
    );
  }
}

export default Posts;
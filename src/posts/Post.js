import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const POST_QUERY = gql`
query post($id: ID!){
  post(where: { id: $id}) {
    id
    title
    body
  }
}
`;


class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query
        query={POST_QUERY}
        variables={{ id: match.params.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading page...</p>
          const { post } = data;
          return (
            <Fragment>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </Fragment>
          )
        }}
      </Query>
    );
  }
}

export default Post;
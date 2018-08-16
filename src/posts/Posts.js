import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import POSTS_QUERY from './posts.graphql';


class Posts extends Component {
  render() {
    return (
      <div>
        <Link className="button" to={'/post/new'}>New Post</Link>
        <Query query={POSTS_QUERY}>

          {/* fetchMore is available on queries */}
          {({ loading, data, fetchMore }) => {
            if (loading) return <p>Loading data...</p>;
            const { posts } = data;
            return (
              <Fragment>
                <ol className="posts-listing">
                  {posts.map(post => (
                    <li key={post._id}>
                      <Link to={`/post/${post.id}`}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ol>
                <div>
                  {/* onClick is called */}
                  {/* fetchMore takes 2 arguments */}
                  {/* first argument is an obj of the variables you want to send to the query */}
                  <button onClick={() => fetchMore({
                    variables: {
                      skip: posts.length
                    },
                    // second argument is the updateQuery function
                    updateQuery: (prev, { fetchMoreResult }) => {
                      // First check if there are any more results
                      if (!fetchMoreResult) return prev;
                      // then return a new obj with the original posts array and the new posts array
                      return Object.assign({}, prev, {
                        posts: [...prev.posts, ...fetchMoreResult.posts]
                      })
                    }
                  })}>Load more...</button>
                </div>
              </Fragment>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default Posts;
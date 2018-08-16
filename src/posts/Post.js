import React, { Component, Fragment } from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import UpdatePost from './UpdatePost';
import EditMode from './EditMode';

const POST_QUERY = gql`
query post($id: ID!){
  post(where: { id: $id}) {
    id
    title
    body
    checkybox
  }
  isEditMode @client
}
`;

const UPDATE_POST = gql`
mutation updatePost($checkybox: Boolean, $id: ID!) {
  updatePost(
    where: {id: $id}
    data: {
    checkybox: $checkybox
  }) {
    checkybox
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
          const { post, isEditMode } = data;
          return (
            <Fragment>
              <EditMode isEditMode={isEditMode} />
              {isEditMode ? (
                <section>
                  <h1>Edit Post</h1>
                  <UpdatePost post={post} />
                </section>
              ) : (
                  <section>
                    <h1>{post.title}</h1>
                    <Mutation
                      mutation={UPDATE_POST}
                      variables={{
                        id: post.id,
                        checkybox: !post.checkybox
                      }}
                      optimisticResponse={{
                        __typename: 'Mutation',
                        updatePost: {
                          __typename: 'Post',
                          checkybox: !post.checkybox
                        }
                      }}
                      update={(cache, { data: { updatePost } }) => {
                        const data = cache.readQuery({
                          query: POST_QUERY,
                          variables: {
                            id: post.id
                          }
                        })
                        data.post.checkybox = updatePost.checkybox;
                        cache.writeQuery({
                          query: POST_QUERY,
                          data: {
                            ...data,
                            post: data.post
                          }
                        })
                      }
                      }
                    >
                      {(updatePost) => {
                        return <input
                          className="checkybox"
                          type="checkbox"
                          onChange={updatePost}
                          checked={post.checkybox}
                        />
                      }}
                    </Mutation>
                  </section>
                )}
            </Fragment>
          )
        }}
      </Query>
    );
  }
}

export default Post;
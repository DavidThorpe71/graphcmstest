import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: "https://api-euwest.graphcms.com/v1/cjku2ljfm09wq01ahmofb4fq6/master"
});


const POSTS_QUERY = gql`
{
  posts {
    id
    title
    body
  }
}
`;

// client.query({
//   query: testQuery
// }).then(res => console.log(res));


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Query query={POSTS_QUERY}>
            {({ loading, data }) => {
              if (loading) return <p>Loading data...</p>;
              const { posts } = data;
              return posts.map(post => {
                return <h1>{post.title}</h1>
              })
            }}

          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

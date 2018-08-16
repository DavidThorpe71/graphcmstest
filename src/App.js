import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Post from './posts/Post';
import Posts from './posts/Posts';
import NewPost from './posts/NewPost';


const defaultState = {
  isEditMode: false
}

const client = new ApolloClient({
  uri: "https://api-euwest.graphcms.com/v1/cjku2ljfm09wq01ahmofb4fq6/master",
  clientState: {
    defaults: defaultState,
    resolvers: {}
  }
});




class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to={'/'}>
                <h1 className="App-title">Home</h1>
              </Link>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/post/new" component={NewPost} />
                <Route path="/post/:id" component={Post} />
              </Switch>
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

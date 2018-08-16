import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Post from './posts/Post';
import Posts from './posts/Posts';
import NewPost from './posts/NewPost';

class App extends Component {
  render() {
    return (

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

    );
  }
}

export default App;

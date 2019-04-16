import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import Launchers  from './components/launchers'
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client= {client}>
      <div className="container">
        <h1>space x </h1>
        <h2>hi </h2>
        <Launchers />
      </div>
      </ApolloProvider>
    );
  }
}

export default App;

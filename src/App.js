import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Search from './components/Search';
import Landing from './pages/Landing';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

class App extends Component {
  state = {
    query: '',
  };

  handleSearchChange = event => this.setState({ query: event.target.value });

  render() {
    const { handleSearchChange } = this;
    const { query } = this.state;

    return (
      <AppWrapper>
        <Search value={query} onChange={handleSearchChange} />
        <Switch>
          <Route path="/" render={props => <Landing {...props} />} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default App;

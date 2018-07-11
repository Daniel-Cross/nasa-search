import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from './components/Search';
import Landing from './pages/Landing';
import SearchResults from './pages/SearchResults';

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
    const { history } = this.props;

    return (
      <AppWrapper>
        <Search
          value={query}
          onChange={handleSearchChange}
          onSearch={() => history.push(`/search?q=${query}`)}
        />
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route
            exact
            path="/search"
            render={props => <SearchResults {...props} />}
          />
        </Switch>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({}),
};

export default withRouter(App);

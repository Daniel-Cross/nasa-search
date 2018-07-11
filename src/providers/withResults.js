import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';

/**
 * A parent container around components that will pass in a results
 * prop with data from the Nasa images API
 */
class ResultsWrapper extends Component {
  state = {
    results: null,
  };

  componentDidMount() {
    this.getResults();
  }

  componentDidUpdate() {
    this.getResults();
  }

  getResults = () => {
    const { location } = this.props;
    const { q: query } = queryString.parse(location.search);

    axios
      .get(`https://images-api.nasa.gov/search?q=${query}`)
      .then(({ data: { collection: { items } } }) => {
        const imageItems = this.getImageResults(items);
        const transformedItems = this.transformResults(imageItems);
        const paginatedItems = this.paginateResults(transformedItems);

        this.updateResults(paginatedItems);
      })
      .catch(err => console.error(err));
  };

  getImageResults = items =>
    items.filter(item => item.data[0].media_type === 'image');

  transformResults = items =>
    items.map(
      ({
        data: [{ nasa_id: _id, title, description }],
        links: [{ href: src }],
      }) => ({
        _id,
        title,
        description,
        src,
      }),
    );

  updateResults = items => this.setState({ results: items });

  paginateResults = items => {
    const { currentPage, limit } = this.props;

    return items.slice(currentPage - 1, limit);
  };

  render() {
    const { results } = this.state;
    const { component: Child, ...props } = this.props;

    if (!results) {
      return null;
    }

    return (
      <Fragment>
        <Child results={results} {...props} />
      </Fragment>
    );
  }
}

ResultsWrapper.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func,
  ]).isRequired,
  location: PropTypes.shape({}),
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export const withResults = component =>
  withRouter(props => <ResultsWrapper component={component} {...props} />);

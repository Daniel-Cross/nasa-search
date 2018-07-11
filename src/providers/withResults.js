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
    if (this.state.results === null) {
      this.getResults();
    }
  }

  getResults = () => {
    const { location } = this.props;
    const { q: query } = queryString.parse(location.search);

    axios
      .get(`https://images-api.nasa.gov/search?q=${query}`)
      .then(({ data: { collection: { items } } }) => {
        const imageItems = this.getImageResults(items);
        const transformedItems = this.transformResults(imageItems);

        this.updateResults(transformedItems);
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

  render() {
    const { results } = this.state;
    const { component: Child, ...props } = this.props;

    return (
      <Fragment>
        <Child results={results} {...props} />
      </Fragment>
    );
  }
}

ResultsWrapper.propTypes = {
  component: PropTypes.element.isRequired,
  location: PropTypes.shape({}),
};

export const withResults = component =>
  withRouter(props => <ResultsWrapper component={component} {...props} />);

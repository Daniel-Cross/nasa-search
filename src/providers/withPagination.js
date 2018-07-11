import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * A parent container around components that allows getting and setting
 * of page state
 */
class PaginationWrapper extends Component {
  state = {
    currentPage: 1,
    limit: 10,
  };

  setPage = currentPage => this.setState({ currentPage });

  render() {
    const { currentPage, limit } = this.state;
    const { component: Child, ...props } = this.props;

    return (
      <Fragment>
        <Child
          limit={limit}
          currentPage={currentPage}
          setPage={this.setPage}
          {...props}
        />
      </Fragment>
    );
  }
}

PaginationWrapper.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func,
  ]).isRequired,
};

export const withPagination = component => props => ( // eslint-disable-line
  <PaginationWrapper component={component} {...props} /> // eslint-disable-line
);

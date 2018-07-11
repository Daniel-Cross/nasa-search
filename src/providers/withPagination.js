import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * A parent container around components that allows getting and setting
 * of page state
 */
class PaginationWrapper extends Component {
  state = {
    currentPage: 1,
    limit: 20,
  };

  setPage = currentPage => this.setState({ currentPage });

  render() {
    const { currentPage } = this.state;
    const { component: Child, ...props } = this.props;

    return (
      <Fragment>
        <Child currentPage={currentPage} setPage={this.setPage} {...props} />
      </Fragment>
    );
  }
}

PaginationWrapper.propTypes = {
  component: PropTypes.element.isRequired,
};

export const withPagination = component => props => ( // eslint-disable-line
  <PaginationWrapper component={component} {...props} /> // eslint-disable-line
);

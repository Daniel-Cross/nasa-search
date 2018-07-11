import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withResults, withPagination } from '../providers';
import SearchResult from '../components/SearchResult';

const SearchResultsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;

const SearchResults = ({ results }) => (
  <SearchResultsWrapper>
    {results.map(result => <SearchResult key={result._id} {...result} />)}
  </SearchResultsWrapper>
);

SearchResults.defaultProps = {
  results: [],
};

SearchResults.propTypes = {
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ),
};

export default withPagination(withResults(SearchResults));

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MdSearch from 'react-icons/lib/md/search';
import { darken } from 'polished';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  border: 0;
  height: 6rem;
  box-sizing: border-box;
  background-color: ${({ theme: { colors } }) => colors.grey};
  color: white;
  flex: 1;
  transition: all 0.2s ease-in;
  font-family: inherit;
  padding: 0 2.5rem;
  outline: 0;
  font-size: 2.5rem;
  font-weight: 300;

  &:focus {
    background-color: white;
    color: ${({ theme: { colors } }) => colors.grey};
  }
`;

const Button = styled.button`
  border: 0;
  width: 6rem;
  height: 6rem;
  background-color: ${({ theme: { colors } }) => colors.red};
  color: white;
  box-sizing: border-box;
  font-size: 2.5rem;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
  outline: 0;

  &:hover {
    background-color: ${({ theme: { colors } }) => darken(0.15, colors.red)};
  }
`;

const Search = ({ value, onChange, onSearch }) => (
  <SearchWrapper>
    <Input
      placeholder="enter a search term"
      value={value}
      onChange={onChange}
      onKeyPress={e => (e.key === 'Enter' ? onSearch() : null)}
    />
    <Button onClick={onSearch}>
      <MdSearch />
    </Button>
  </SearchWrapper>
);

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Search;

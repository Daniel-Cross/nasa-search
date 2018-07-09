import React from 'react';
import styled from 'styled-components';
import MdArrowUp from 'react-icons/lib/md/arrow-upward';

const LandingWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 2.5rem 2.5rem 5rem;
  justify-content: space-between;
  flex-direction: column;
`;

const GetStartedText = styled.h2`
  margin: 0;
  color: ${({ theme: { colors } }) => colors.midGrey};
  font-size: 4rem;
  font-weight: 500;
`;

const HeroText = styled.h1`
  margin: 0;
  font-size: 8rem;
  font-weight: 500;
`;

const Landing = () => (
  <LandingWrapper>
    <GetStartedText>
      <MdArrowUp /> get started
    </GetStartedText>
    <HeroText>Nasa Image Search</HeroText>
  </LandingWrapper>
);

export default Landing;

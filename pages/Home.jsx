/* eslint-disable */
import React from 'react';
import Introduction from '../components/Introduction';
import BookSummaries from '../components/BookSummaries';
import FieldNoteEventSection from '../components/FieldNoteEventSection';
import StayInTheKnow from '../components/StayInTheKnow';
import useAuthRedirect from '../hooks/useAuthRedirect';

const Home = () => {
  useAuthRedirect();
  return (
    <>
      <Introduction />
      <FieldNoteEventSection />
      <StayInTheKnow />
      <BookSummaries />
    </>
  );
};

export default Home;

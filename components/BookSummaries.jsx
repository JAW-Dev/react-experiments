import React from 'react';
import useFetch from '../hooks/useFetch';
import Container from './Container';

import PodcastImg from '../../../../assets/images/reskin-images/img--podcasts.png';
import Text from './Text';

const ListenToOurPodcast = () => (
  <div className="listen-to-our-podcast flex relative overflow-hidden h-full p-8">
    <div className="flex flex-col items-star z-10 h-full w-full">
      <Text size="h6" variant="bold">
        PODCAST FEEDS
      </Text>

      <div className="w-full flex justify-center">
        <img
          src={PodcastImg}
          alt="Listen to our podcast."
          style={{ maxHeight: '340px', width: 'auto' }}
        />
      </div>

      <h4 className="mt-auto font-bold pb-2">
        Subscribers have special access to two key private podcast feeds:
      </h4>
      <ul className="mb-6 listen-to-our-podcast__list">
        <li>
          All Admired Leader Behavior modules
        </li>
        <li>
          All AL Direct Q&A sessions
        </li>
      </ul>

      <a
        href="mailto:support@admiredleadership.com?subject=Admired%20Leadership%20Podcast%20Feeds%20Request&body=Hello,%20I%20am%20reaching%20out%20today%20to%20request%20my%20personal%20Admired%20Leadership%20Podcast%20Feed%20links.%20Thanks!"
        style={{ borderRadius: '32px', width: 'fit-content' }}
        className="bg-link-purple text-white texdt-sm font-extrabold py-4 px-5  flex items-center justify-center uppercase mx-auto"
      >
        Get Your Links
      </a>
    </div>
  </div>
);

const BookSummaryCard = ({ bookSummary }) => {
  const {
    uagb_featured_image_src: { medium },
    title: { rendered: title },
    subtitle,
    link
  } = bookSummary;

  return (
    <div className="book-summary-img p-6 flex flex-col items-start">
      <a href={link}>
        <img src={medium[0]} alt="Book" />
      </a>
      <a
        href={link}
        className="font-black font-sans text-sm text-charcoal mt-4 text-left"
      >
        {title}
      </a>
      <Text size="h6" variant="p" className="mb-6">
        {subtitle}
      </Text>
      <a
        href={link}
        className="font-black text-link-purple font-sans text-sm mt-auto"
      >
        <Text size="h6" variant="linkPurple">
          READ SUMMARY
        </Text>
      </a>
    </div>
  );
};

const BookSummaries = () => {
  const { data: bookSummaries } = useFetch(
    'https://admiredleadership.com/wp-json/wp/v2/book-summary'
  );

  return (
    <Container
      containerize
      style={{ gap: '24px' }}
      className="flex py-10 flex-col items-center xl:flex-row"
    >
      <ListenToOurPodcast />

      <div
        style={{
          boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.2)',
          borderRadius: '32px'
        }}
        className="bg-white p-8 w-full"
      >
        <div className="flex w-full items-center justify-between mb-2">
          <Text size="h6" variant="bold">
            BOOK SUMMARIES
          </Text>
          <a
            type="button"
            className="font-sans font-black text-link-purple"
            href="/program/book-summaries"
          >
            <Text size="h6" variant="linkPurple">
              SEE ALL
            </Text>
          </a>
        </div>
        <Text size="p" variant="p" className="mb-6">
          Read our summaries of leadership best reads.
        </Text>

        <div
          style={{ gap: '32px' }}
          className="flex flex-col md:flex-row"
        >
          {bookSummaries &&
            bookSummaries.map((bookSummary, index) => (
              index < 3 && (
              <BookSummaryCard
                key={crypto.randomUUID()}
                bookSummary={bookSummary}
              />
              )
            ))}
        </div>
      </div>
    </Container>
  );
};

export default BookSummaries;

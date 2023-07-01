import React from 'react';
import { useQuery } from 'react-query';
import SVG from 'react-inlinesvg';
import { allUserHabitsCategorized } from '../helpers/apiCalls';
import HabitsList from '../components/HabitsList';
import IconLargeHeart from '../../../../assets/images/reskin-images/icon--heart--lg.svg';

const NoFavorites = () => {
  return (
    <div
      style={{ height: 'calc(100vh - 250px)' }}
      className="flex items-center justify-center w-full"
    >
      <div
        style={{ maxWidth: '460px', transform: 'translateY(-100px)' }}
        className="flex flex-col items-center justify-center"
      >
        <SVG className="mb-3" src={IconLargeHeart} />
        <span className="text-charcoal font-sans font-bold text-3xl mb-2">
          No Favorited Habits
        </span>
        <p className="text-center text-charcoal font-sans">
          Save the habits you would like to look back on and be reminded of
          here. You can favorite habits in the behavior map section in the
          module viewer.
        </p>
      </div>
    </div>
  );
};

const FavoriteHabits = () => {
  const { data, isLoading } = useQuery(
    'allUserHabitsCategorized',
    allUserHabitsCategorized
  );

  return (
    <div className="w-full">
      {isLoading && <div className="">Loading</div>}
      {data && !data.length && <NoFavorites />}
      {data && data.length > 0 && <HabitsList list={data} />}
    </div>
  );
};

export default FavoriteHabits;

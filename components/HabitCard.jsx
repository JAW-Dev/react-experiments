import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { useMutation, useQueryClient } from 'react-query';
import IconHeart from '../../../../assets/images/reskin-images/icon--heart.svg';
import IconFilledHeart from '../../../../assets/images/reskin-images/icon--filled-heart.svg';
import { createOrDestroyUserHabit } from '../helpers/apiCalls';
import useData from '../context/DataContext';

const HabitCard = ({ habit, variant, imgShadow }) => {
  const queryClient = useQueryClient();
  const { userHabits } = useData();
  const { mutate } = useMutation(createOrDestroyUserHabit, {
    onSuccess: () => {
      queryClient.invalidateQueries('userHabits');
    },
  });

  const {
    description,
    id,
    image: {
      thumb: { url: imgURL },
    },
  } = habit;

  const isFavorited = userHabits?.some(
    (userHabit) => userHabit.curriculum_behavior_map_id === id
  );

  // add state for image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  // handle image loaded
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  // handle image loading error
  const handleImageError = () => {
    setImageLoaded(false);
  };

  const favoriteButton = (
    <button
      className="flex items-center mt-auto"
      type="button"
      onClick={() => mutate({ behaviorMapId: id })}
    >
      <SVG src={isFavorited ? IconFilledHeart : IconHeart} />{' '}
      <p className="text-sm font-inter text-charcoal ml-2">
        {isFavorited ? 'Favorited' : 'Favorite'}
      </p>
    </button>
  );

  const cardVariant = (
    <div className="habit-card p-6">
      <div style={{ gap: '24px' }} className="flex">
        <div className="habit-card__img-wrapper flex items-center justify-center overflow-hidden rounded-full mr-6">
          <img src={imgURL} alt="Habit Card" />
        </div>

        <p className="text-charcoal font-inter">{description}</p>
      </div>

      {/* {favoriteButton} */}
    </div>
  );

  const inlineVariant = (
    <div className="flex items-center">
      <div
        style={{ boxShadow: imgShadow && '0px 20px 50px rgba(0, 0, 0, 0.1)' }}
        className="habit-card__img-wrapper flex items-center justify-center overflow-hidden rounded-full mr-6 relative"
      >
        <img
          src={imgURL}
          alt="Habit Card"
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: !imageLoaded && 'none' }}
        />
        {!imageLoaded && <div className="loading-colors w-full h-full absolute pin-t pin-l" />}
      </div>
      <div style={{ gap: '16px' }} className="flex flex-col flex-auto">
        <p className="text-charcoal font-sans font-semibold text-base md:text-lg">
          {description}
        </p>
        {favoriteButton}
      </div>
    </div>
  );
  return variant === 'card' ? cardVariant : inlineVariant;
};

export default HabitCard;

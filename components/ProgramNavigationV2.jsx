import React, { useState, useRef, forwardRef } from 'react';
import { useSearchParams, NavLink, useParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import IconChevronLeft from '../../../../assets/images/reskin-images/icon--chevron-left.svg';
import IconChevronRight from '../../../../assets/images/reskin-images/icon--chevron-right.svg';
import IconLock from '../../../../assets/images/reskin-images/icon--lock-sm.svg';
import CheckIcon from '../../../../assets/images/reskin-images/icon--check-circle.svg';
import PlayIcon from '../../../../assets/images/reskin-images/icon--play-sm.svg';

import ALDImg from '../../../../assets/images/reskin-images/img--ald-direct.png';
import StudyGroupImg from '../../../../assets/images/reskin-images/img--study-groups.png';
import CohortsImg from '../../../../assets/images/reskin-images/img--upcoming-cohorts.jpeg';
import BespokeImg from '../../../../assets/images/reskin-images/img--bespoke-solutions.jpeg';

import useData from '../context/DataContext';
import { shortenParagraph, convertVideoTime } from '../helpers';
import Accordion from './Accordion';
import useResponsive from '../hooks/useResponsive';
import { useSlideContent } from '../context/SlideContent';
import LinearProgressBar from './LinearProgressBar';

function NavigationSizeSetButton({ navigationSize, setNavigationSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const decrement = () => {
    if (searchParams.get('moduleView')) {
      searchParams.delete('moduleView');
      setSearchParams(searchParams);
    }
    setNavigationSize((prev) => {
      if (prev !== 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const increment = () => {
    setNavigationSize((prev) => {
      if (prev !== 2) {
        return prev + 1;
      }
      return prev;
    });
  };

  const buttonClick = () => {
    navigationSize === 0 ? increment() : decrement();
  };

  return (
    <button
      style={{
        width: '52px',
        height: '52px',
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.2)',
        top: '150px',
        right: '-26px',
      }}
      className="items-center justify-center hidden lg:flex bg-white absolute overflow-hidden rounded-full"
      type="button"
      onClick={buttonClick}
    >
      <SVG
        src={navigationSize === 0 ? IconChevronRight : IconChevronLeft}
        alt="Minimize "
      />
    </button>
  );
}

const scrollModuleCardToCenter = (moduleCardRef, isTablet) => {
  const container = isTablet
    ? document.documentElement
    : document.querySelector('.navigation-inner');
  const containerRect = container.getBoundingClientRect();
  const moduleCardRect = moduleCardRef.current.getBoundingClientRect();

  const scrollOffset =
    moduleCardRect.top -
    (isTablet ? 0 : containerRect.top) +
    container.scrollTop -
    (container.clientHeight - moduleCardRect.height) * 0.2;

  const maxScrollTop = container.scrollHeight - container.clientHeight;
  const scrollTop = Math.min(maxScrollTop, Math.max(0, scrollOffset));

  if (isTablet) {
    window.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });
  } else {
    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });
  }
};
const ModuleCard = forwardRef(({ moduleData, imgSrc, moduleIndex }, ref) => {
  const {
    title,
    behaviors,
    description,
    id: moduleId,
    enrolled_in,
    poster,
  } = moduleData;

  const hasPoster = poster?.url && !poster.url.includes('blank');

  const [openBehaviors, setOpenBehaviors] = useState(false);
  const { moduleId: moduleIdParam, behaviorId: behaviorIdParam } = useParams();
  const { isTablet } = useResponsive();
  const { setSlideContent } = useSlideContent();

  const isFirstTwo = moduleIndex < 2;
  const isFoundation = moduleIndex === 0;
  const isIntroduction = moduleIndex === 1;

  function getBehaviorViewObject() {
    let word = 'Behaviors'; // Default word
    switch (true) {
      case isFoundation:
        word = 'Foundational Principal';
        break;
      case isIntroduction:
        word = 'Introduction';
        break;
      default:
        break;
    }

    return {
      view: `View ${word}`,
      hide: `Hide ${word}`,
    };
  }

  const viewHideWording = getBehaviorViewObject();

  return (
    <div
      style={{
        width: !isTablet ? '488px' : '100%',
        maxWidth: !isTablet && '488px',
        boxShadow: !isTablet && '0px 10px 50px rgba(0, 0, 0, 0.2)',
      }}
      ref={ref}
      className={`w-full lg:rounded-xl relative overflow-hidden border-t border-gray  lg:border-none text-sm ${
        isFirstTwo && 'bg-purple-100'
      }`}
    >
      <button
        style={{
          minHeight: '200px',
          gap: '20px',
        }}
        className="w-full flex p-4 items-center"
        type="button"
        onClick={() => {
          setOpenBehaviors(!openBehaviors);
          if (!openBehaviors) {
            scrollModuleCardToCenter(ref, isTablet);
          }
        }}
      >
        <div
          style={{
            width: '88px',
            minWidth: '88px',
            height: '200px',
          }}
          className="relative h-full overflow-hidden rounded-2lg"
        >
          <img
            src={hasPoster ? poster?.url : imgSrc}
            alt="Module thumbnail image"
            className="object-cover h-full"
            style={{ objectPosition: '30% 50%' }}
          />
        </div>

        <div className="h-full flex flex-col items-start py-3 lg:py-0 flex-auto">
          <span className="text-charcoal font-extrabold text-lg mb-2 block text-left">
            {title}
          </span>
          <span className="text-charcoal text-sm block text-left">
            {shortenParagraph(description, isTablet ? 150 : 150)}
          </span>
          <LinearProgressBar module={moduleData} className="w-full my-4 " />
          <span className="uppercase font-bold text-link-purple mt-2 text-left">
            {openBehaviors ? viewHideWording.hide : viewHideWording.view}
          </span>
        </div>
      </button>

      <Accordion isOpen={openBehaviors}>
        {behaviors.map((behaviorData, index) => {
          const {
            completed,
            title,
            id: behaviorId,
            video_length: videoLength,
          } = behaviorData;

          const isCurrentBehavior =
            behaviorIdParam === behaviorId.toString() &&
            moduleIdParam === moduleId.toString();

          function getModuleName() {
            let result;

            if (index === 0) {
              return 'Introduction ';
            }

            switch (true) {
              case isFoundation:
                result = 'Foundational Principal ';
                break;
              case isIntroduction:
                result = 'Introduction ';
                break;
              default:
                result = `Module ${moduleIndex - 1}.`;
                break;
            }
            return result;
          }

          const behaviorNumbering =
            isFoundation && index === 0
              ? 'to Foundational Principles'
              : isIntroduction
              ? ''
              : index === 0
              ? ` to Module ${moduleIndex - 1}`
              : `${index}`;

          return enrolled_in ? (
            <NavLink
              to={`/v2/program/${moduleId}/${behaviorId}`}
              onClick={() => isTablet && setSlideContent(true)}
              type="button"
              key={behaviorId}
              style={{ gap: '20px' }}
              className={`border-t border-gray p-4 lg:hover:bg-purple-200 w-full flex ${
                isCurrentBehavior && 'bg-purple-200'
              }`}
            >
              <div style={{ minWidth: '24px', minHeight: '24px' }}>
                {completed ? (
                  <SVG src={CheckIcon} />
                ) : (
                  <SVG
                    src={PlayIcon}
                    className={isCurrentBehavior && 'purple-icon'}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={`${
                    isCurrentBehavior ? 'text-link-purple' : 'text-charcoal'
                  } font-bold mb-1`}
                >
                  {title}
                </span>
                <span className="text-charcoal text-sm ">
                  {convertVideoTime(videoLength)} |{' '}
                  {getModuleName() + behaviorNumbering}
                </span>
              </div>
            </NavLink>
          ) : (
            <button
              type="button"
              key={behaviorId}
              style={{ gap: '20px' }}
              className={`border-t border-gray p-4 lg:hover:bg-purple-200 w-full flex justify-start
              }`}
              disabled
            >
              <div style={{ minWidth: '24px', minHeight: '24px' }}>
                <SVG src={IconLock} />
              </div>
              <div className="flex flex-col">
                <span className="text-charcoal font-bold mb-1 text-left">
                  {title}
                </span>
                <span className="text-charcoal text-sm text-left">
                  {convertVideoTime(videoLength)} |{' '}
                  {getModuleName() + behaviorNumbering}
                </span>
              </div>
            </button>
          );
        })}
      </Accordion>
    </div>
  );
});

export default function ProgramNavigationV2({
  navigationSize,
  setNavigationSize,
  isTablet,
}) {
  const navWidth =
    navigationSize === 0
      ? '100px'
      : navigationSize === 1
      ? 'auto'
      : 'calc(100vw - 100px)';

  const { contentData } = useData();
  const images = [ALDImg, StudyGroupImg, CohortsImg, BespokeImg];

  return (
    <div
      style={{ zIndex: '10' }}
      className="w-full lg:w-auto lg:fixed lg:pin-l lg:pin-t lg:h-screen bg-faint-charcoal"
    >
      <div
        style={{
          width: navWidth,
          transition: 'all 0.3s ease',
        }}
        className="relative h-full"
      >
        {navigationSize !== 0 && (
          <div
            style={{
              paddingLeft: !isTablet && 'calc(100vw * 0.05)',
              paddingRight: !isTablet && '36px',
            }}
            className="w-full h-full py-16 lg:py-32 lg:overflow-y-scroll navigation-inner"
          >
            <span className="font-inter lg:font-sans lg:uppercase text-2xl ml-4 lg:m-0 lg:text-sm font-black">
              Modules
            </span>
            <div
              style={{ gap: !isTablet && '24px' }}
              className={`flex ${
                navigationSize === 2 && !isTablet
                  ? 'flex-row flex-wrap items-start'
                  : 'flex-col'
              } mt-10`}
            >
              {contentData?.modules.map((moduleData, index) => {
                const imgSrc = images[index % images.length];
                const moduleCardRef = useRef(null);
                return (
                  <ModuleCard
                    ref={moduleCardRef}
                    key={moduleData.id}
                    moduleData={moduleData}
                    imgSrc={imgSrc}
                    moduleIndex={index}
                  />
                );
              })}
            </div>
          </div>
        )}
        <NavigationSizeSetButton
          navigationSize={navigationSize}
          setNavigationSize={setNavigationSize}
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { csrfToken } from '@rails/ujs';
import SVG from 'react-inlinesvg';
import { Link, useParams } from 'react-router-dom';

import useData from '../context/DataContext';
import VideoPlayer from './VideoPlayer';

import IconMiniVideo from '../../../../assets/images/reskin-images/icon--mini-video.svg';
import IconExpandVideo from '../../../../assets/images/reskin-images/icon--expand-video.svg';

import { ModuleCircle } from './ProgramNavigation';
import useResponsive from '../hooks/useResponsive';
import { convertVideoTime } from '../helpers';
import ContentTabs from './ContentTabs';
import { useSlideContent } from '../context/SlideContent';

// const BehaviorContentAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const content = useRef(null);
//   const [height, setHeight] = useState('0px');

//   useEffect(() => {
//     setHeight(isOpen ? `${content.current.scrollHeight + 20}px` : '0px');
//   }, [isOpen]);

//   return (
//     <div className="behavior-content-accordion overflow-hidden z-10">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         type="button"
//         className="flex items-center px-4 py-6 w-full"
//       >
//         <span
//           style={{ height: '16px', width: '16px' }}
//           className={`rounded-full mr-3 ${isOpen ? 'bg-green-500' : 'bg-gray'}`}
//         />
//         <h5 className="leading-none font-inter text-lg xl:font-sans xl:font-bold text-base text-charcoal xl:text-xl">
//           {title}
//         </h5>
//         <div
//           style={{
//             transform: isOpen && 'rotate(180deg)',
//             transition: 'transform 0.2s linear',
//           }}
//           className="ml-auto"
//         >
//           <SVG src={IconChevronDown} />
//         </div>
//       </button>

//       <section
//         key={crypto.randomUUID()}
//         className="accordion__content"
//         ref={content}
//         style={{ zIndex: 1, maxHeight: height }}
//       >
//         <div className="px-4 pb-6">
//           <div
//             style={{ borderRadius: '14px' }}
//             className="p-4 border border-gray"
//           >
//             {children}
//           </div>

//           <button
//             className="mt-4 xl:hidden font-bold text-base"
//             type="button"
//             onClick={() => setIsOpen(false)}
//           >
//             Collapse {title}
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

const ProgramContent = ({ navigationSize, setNavigationSize }) => {
  const { slideContent } = useSlideContent();
  const { contentData } = useData();
  const [displayed, setDisplayed] = useState();
  const [nextUp, setNextUp] = useState();
  const { moduleId: moduleIdParams, behaviorId: behaviorIdParams } =
    useParams();

  const [behaviorDetails, setBehaviorDetails] = useState();

  const setDisplayedHelper = async () => {
    if (!contentData) return;
    const { modules } = contentData;
    const module = await modules.find(
      (obj) => obj.id.toString() === moduleIdParams
    );

    if (!module.enrolled_in) {
      window.location.href = '/users/access';
    }
    const behavior = await module.behaviors.find(
      (obj) => obj.id.toString() === behaviorIdParams
    );

    let currBehavior;

    const behaviorIndex =
      (await module.behaviors.findIndex((b) => b.id === behavior.id)) + 1;

    if (module.behaviors[behaviorIndex]) {
      currBehavior = module.behaviors[behaviorIndex];
    } else {
      const moduleIndex =
        (await modules.findIndex((m) => m.id === module.id)) + 1;
      currBehavior = modules[moduleIndex].behaviors[0];
    }

    const obj = {
      url: `/v2/program/${module.id}/${currBehavior.id}`,
      title: currBehavior.title,
      time: convertVideoTime(currBehavior.video_length),
    };

    setNextUp(obj);

    setDisplayed({
      module,
      behavior,
      behaviorIndex,
    });
  };

  useEffect(() => {
    setDisplayedHelper();
  }, [contentData, moduleIdParams, behaviorIdParams]);

  useEffect(() => {
    const getBeahviorDetails = () => {
      fetch('/api/v2/behaviors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken(),
        },
        body: JSON.stringify({
          behavior_id: behaviorIdParams,
        }),
      })
        .then((response) => response.json())
        .then((data) => setBehaviorDetails(data))
        .catch((error) => console.error(error));
    };

    getBeahviorDetails();
  }, [behaviorIdParams]);

  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    if (!isMobile) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [moduleIdParams, behaviorIdParams]);

  const ref = useRef(null);

  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [videoHover, setVideoHover] = useState(false);

  const miniButtonClick = () => {
    setIsMiniPlayer(!isMiniPlayer);
    setVideoHover(false);
  };

  return (
    displayed && (
      <div
        className={`program-content program-content--${
          slideContent && 'slide-in'
        } w-full bg-white h-full lg:h-auto fixed lg:static pin-t`}
      >
        <div
          className={`hidden lg:flex float-left  program-content-filler h-full program-content-filler--${navigationSize}`}
        />
        <div className="program-content-wrapper flex flex-col flex-auto items-center lg:items-start overflow-x-hidden relative">
          {/* <div className="w-full lg:hidden relative mb-8">
            <button
              style={{ height: '48px', width: '48px' }}
              type="button"
              className=" lg:hidden flex items-center justify-center bg-grey-lighter rounded-full absolute pin-t pin-r"
              onClick={() => setSlideContent(false)}
            >
              <SVG src={IconXBlack} />
            </button>
            <h2
              style={{ width: 'fit-content', borderRadius: '25px' }}
              className="py-2 px-4 bg-purple-500 text-white font-bold font-inter mb-4 text-base uppercase"
            >
              {displayed.module.title === 'Foundations'
                ? 'Foundations'
                : `Module ${displayed.module.position - 1}`}
            </h2>
            <h1 className="text-black font-bold font-inter leading-none text-2xl">
              {displayed.module.title}
            </h1>
          </div> */}

          <h6 className="hidden lg:block text-sm font-black uppercase text-charcoal mb-8">
            Current Module: {displayed.module.title}
          </h6>

          <div
            style={{
              aspectRatio: '16 / 9',
              margin: isTablet && '0 calc(-5% * 100vw)',
            }}
            className=" w-screen lg:w-full mb-6"
            ref={ref}
          >
            {isMiniPlayer && (
              <button
                onClick={() => setIsMiniPlayer(false)}
                style={{ borderRadius: '32px' }}
                className="w-full h-full bg-gray flex items-center justify-center"
                type="button"
              >
                <SVG src={IconExpandVideo} />{' '}
                <p className="ml-2 font-inter ">Click to expand video here</p>
              </button>
            )}
            <div
              className={`z-50 ${isMiniPlayer && 'video-player-wrapper--mini'}`}
            >
              <div
                className="relative"
                onMouseEnter={() => setVideoHover(true)}
                onMouseLeave={() => setVideoHover(false)}
              >
                {!isMobile && videoHover && (
                  <button
                    onClick={() => miniButtonClick()}
                    type="button"
                    className="flex items-center justify-center absolute z-50"
                    style={{
                      top: isMiniPlayer ? '24px' : '30px',
                      right: isMiniPlayer ? 'calc(100% - 48px)' : '30px',
                    }}
                  >
                    <SVG src={isMiniPlayer ? IconExpandVideo : IconMiniVideo} />
                  </button>
                )}
                <VideoPlayer
                  behavior={displayed.behavior}
                  module={displayed.module}
                  className="w-full"
                  height="100%"
                  width="100%"
                  playing={slideContent}
                  mini={isMiniPlayer}
                />
              </div>
              {isMiniPlayer && (
                <div className="p-4 bg-white">
                  <h6 className="font-inter font-semibold text-base mb-2">
                    {displayed.behavior.title}
                  </h6>
                  <p className="font-inter text-grey text-sm">
                    {displayed.module.title}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            style={{ borderRadius: '24px' }}
            className=" lg:hidden mt-6 mb-8 border border-gray p-4 w-full"
          >
            <div className="flex items-center mb-4">
              <ModuleCircle module={displayed.module} diameter={16} />
              <h6 className="ml-4 text-charcoal text-xs font-bold font-inter uppercase">
                {displayed.module.title === 'Foundations' &&
                displayed.behaviorIndex === 1 ? (
                  <span>Introductory Video</span>
                ) : displayed.module.behaviors.length === 1 ? null : (
                  <span>
                    {displayed.module.title === 'Foundations'
                      ? 'Foundational Principle'
                      : 'Behavior'}{' '}
                    {displayed.module.title === 'Foundations'
                      ? displayed.behaviorIndex - 1
                      : displayed.behaviorIndex}{' '}
                    OF{' '}
                    {displayed.module.title === 'Foundations'
                      ? displayed.module.behaviors.length - 1
                      : displayed.module.behaviors.length}
                  </span>
                )}
              </h6>
            </div>

            <h3 className="text-black font-bold font-inter text-xl">
              {displayed.behavior.title}
            </h3>

            <span className="h-px w-full bg-gray mb-4 mt-6 flex" />

            {nextUp && (
              <Link
                type="button"
                to={nextUp.url}
                className="flex flex-col items-start w-full"
              >
                <div
                  type="button"
                  className="text-purple-500 font-inter font-sm mb-2"
                >
                  Up Next
                </div>
                <h6 className="font-inter font-normal text-base text-charcoal">
                  {nextUp.title}
                </h6>
                <p className="text-xs text-charcoal font-inter">
                  {nextUp.time}
                </p>
              </Link>
            )}
          </div>
          <h6 className="hidden lg:block text-sm font-bold text-charcoal uppercase">
            {displayed.module.title === 'Foundations' &&
            displayed.behaviorIndex === 1 ? (
              <span>Introductory Video</span>
            ) : displayed.module.behaviors.length === 1 ? null : (
              <span>
                {displayed.module.title === 'Foundations'
                  ? 'Foundational Principle'
                  : 'Behavior'}{' '}
                {displayed.module.title === 'Foundations'
                  ? displayed.behaviorIndex - 1
                  : displayed.behaviorIndex}{' '}
                OF{' '}
                {displayed.module.title === 'Foundations'
                  ? displayed.module.behaviors.length - 1
                  : displayed.module.behaviors.length}
              </span>
            )}
          </h6>

          <h2 className="hidden lg:block text-charcoal text-3xl font-black leading-none mt-3 mb-8">
            {displayed.behavior.title}
          </h2>
          {behaviorDetails ? (
            <ContentTabs
              behaviorDetails={behaviorDetails}
              displayed={displayed}
            />
          ) : null}
        </div>
      </div>
    )
  );
};

export default ProgramContent;

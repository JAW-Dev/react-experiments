import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProgramNavigation from '../components/ProgramNavigation';
import ProgramContent from '../components/ProgramContent';
import useStopScrolling from '../hooks/useStopScrolling';
import useResponsive from '../hooks/useResponsive';
import { useSlideContent } from '../context/SlideContent';
import useAuthRedirect from '../hooks/useAuthRedirect';
import ProgramNavigationV2 from '../components/ProgramNavigationV2';

const Program = () => {
  const [searchParams, _] = useSearchParams();
  const [navigationSize, setNavigationSize] = useState(
    searchParams.get('moduleView') ? 2 : 1
  ); // Possible Values: 0, 1, 2
  const { slideContent } = useSlideContent();

  const { isTablet } = useResponsive();

  useAuthRedirect();
  useStopScrolling(slideContent && isTablet);

  return (
    <div
      // style={{ height: `calc(100vh - ${height}px)` }}
      className="flex relative w-full"
    >
      <ProgramNavigationV2
        navigationSize={navigationSize}
        setNavigationSize={setNavigationSize}
        isTablet={isTablet}
      />
      <ProgramContent
        navigationSize={navigationSize}
        setNavigationSize={setNavigationSize}
      />
    </div>
  );
};

export default Program;

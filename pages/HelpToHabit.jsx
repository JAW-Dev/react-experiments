import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { NavLink, useMatch, Outlet, useLocation } from 'react-router-dom';

import useResponsive from '../hooks/useResponsive';

import IconFilledSettings from '../../../../assets/images/reskin-images/icon--filled-settings.svg';
import IconSettings from '../../../../assets/images/reskin-images/icon--settings.svg';
import IconFilledStar from '../../../../assets/images/reskin-images/icon--filled-star.svg';
import IconStar from '../../../../assets/images/reskin-images/icon--star2.svg';
import IconHeart from '../../../../assets/images/reskin-images/icon--heart.svg';
import IconFilledHeart from '../../../../assets/images/reskin-images/icon--filled-heart.svg';

const HelpToHabitMenu = () => {
  const menuItems = [
    {
      icon: IconStar,
      activeIcon: IconFilledStar,
      text: 'All Habits',
      route: '/v2/help-to-habit/all-habits',
    },
    {
      icon: IconHeart,
      activeIcon: IconFilledHeart,
      text: 'Favorite Habits',
      route: '/v2/help-to-habit/favorite-habits',
    },
    // {
    //   icon: IconSettings,
    //   activeIcon: IconFilledSettings,
    //   text: 'Subscription Settings',
    //   route: '/v2/help-to-habit/subscription-settings',
    // },
  ];

  const isActiveRoute = (route) => {
    const isActive = useMatch(route);
    return isActive;
  };

  const { isTablet } = useResponsive();
  return (
    <div
      style={{
        paddingLeft: !isTablet && 'calc(100vw * 0.05)',
        paddingTop: '130px',
        width: !isTablet && '550px',
        maxWidth: !isTablet && '550px',
      }}
      className=" px-4 lg:pr-6 fixed pin-t pin-l h-full lg:border-r border-gray-dark"
    >
      <h1
        style={{ fontSize: '48px' }}
        className="text-charcoal font-extrabold font-inter mb-4"
      >
        Help To Habit
      </h1>
      <p className="text-charcoal mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{' '}
      </p>
      <div style={{ gap: '24px' }} className="flex flex-col">
        {menuItems.map((menuItem) => {
          const { icon, activeIcon, text, route } = menuItem;
          const isActive = isActiveRoute(route);
          return (
            <NavLink
              style={{
                borderRadius: '32px',
                boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.1)',
              }}
              key={text}
              to={route}
              className={`flex items-center w-full p-6 border-2 ${
                isActive
                  ? 'bg-lightest-purple border-purple-500'
                  : 'bg-white border-transparent'
              }`}
            >
              <SVG src={isActive ? activeIcon : icon} />
              <span className="ml-4 text-charcoal text-xl font-inter font-medium">
                {text}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

// export const HelpToHabitQuery = () => {
//   return (
//     <div className="flex">
//       <div className="flex mr-3">

//       </div>

//       <button className="">Search</button>
//     </div>
//   );
// };

const HelpToHabit = () => {
  const { isTablet } = useResponsive();
  const location = useLocation();
  const [isOutletVisible, setIsOutletVisible] = useState(false);

  useEffect(() => {
    setIsOutletVisible(location.pathname !== '/v2/help-to-habit');
  }, [location]);

  return (
    <div
      style={{ minHeight: !isTablet && 'calc(100vh - 98px)' }}
      className="flex relative"
    >
      <HelpToHabitMenu />
      <div
        style={{
          marginLeft: !isTablet && '550px',
          width: !isTablet ? 'calc(100vw - 550px)' : '100vw',
          height: isTablet && 'calc(100vh - 64px)',
          left: isOutletVisible ? '0' : '100vw',
          transition: isTablet && 'left 0.3s ease-in-out',
        }}
        className="p-12 absolute lg:flex bg-white overflow-y-scroll lg:overflow-y-auto lg:h-auto"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default HelpToHabit;

import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import { adminMenu } from '../helpers/localData';
import useAuth from '../context/AuthContext';

const AdminSideBarMenu = () => {
  const { pathname } = useLocation();

  return (
    <div
      style={{
        padding: '132px 16px 16px calc(100vw * 0.05)',
        gap: '16px',
        marginTop: '-100px',
        minHeight: 'calc(100vh + 100px)',
      }}
      className="flex flex-col bg-faint-charcoal fixed pin-l border-r border-gray "
    >
      {adminMenu.map((item) => {
        const { route, text, icon, disabled } = item;
        return (
          !disabled && (
            <Link
              className={` font-bold py-2 px-4 -ml-4 rounded flex items-center ${
                pathname === route
                  ? 'bg-purple-100 text-link-purple'
                  : 'text-charcoal hover:bg-purple-100'
              }`}
              key={crypto.randomUUID()}
              to={route}
            >
              <SVG
                src={icon}
                className={`mr-2 ${
                  pathname === route && 'admin-sidebar-menu-svg--active'
                }`}
              />
              {text}
            </Link>
          )
        );
      })}
    </div>
  );
};

export default function Admin() {
  const { userData } = useAuth();

  const navigate = useNavigate();

  if (!userData?.roles?.includes('admin')) {
    navigate('/v2');
  }
  
  return (
    <div className="flex relative">
      <AdminSideBarMenu />
      <Outlet />
    </div>
  );
}

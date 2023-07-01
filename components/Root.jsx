import React, { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Alarm from './Alarm';
import Modal from './Modal';
import Footer from './Footer';

export default function Root() {
  const ref = useRef();

  const { pathname } = useLocation();

  return (
    <div
      ref={ref}
      style={{ minHeight: '100vh' }}
      className="overflow-x-hidden relative"
    >
      <Alarm />
      <Modal />
      <Header />
      <Outlet />
      {!pathname.includes('help-to-habit') && (
        <Footer />
      )}
    </div>
  );
}

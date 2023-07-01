import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Root from './components/Root';
import Admin from './components/Admin';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AlarmProvider } from './context/AlarmContext';
import { ModalProvider } from './context/ModalContext';
import Home from './pages/Home';
import Program from './pages/Program';
import AdminUser from './pages/AdminUser';
import Notes from './pages/Notes';
import HelpToHabit from './pages/HelpToHabit';
import { SlideContentProvider } from './context/SlideContent';
import { NoteContentProvider } from './context/NoteContent';
import { SideBarContentProvider } from './context/SidebarContext';
import AllHabits from './pages/AllHabits';
import FavoriteHabits from './pages/FavoriteHabits';
import SubscriptionSettings from './pages/SubscriptionSettings';
import Onboarding from './components/Onboarding';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/v2',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'program/:moduleId/:behaviorId',
        element: <Program />
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'user',
            element: <AdminUser />
          }
        ]
      },
      {
        path: 'program/notes',
        element: <Notes />
      }
      // {
      //   path: 'help-to-habit',
      //   element: <HelpToHabit />,
      //   children: [
      //     // {
      //     //   index: true,
      //     //   element: <Navigate to="/v2/help-to-habit/all-habits" />,
      //     // },
      //     {
      //       path: 'all-habits',
      //       element: <AllHabits />
      //     },
      //     {
      //       path: 'favorite-habits',
      //       element: <FavoriteHabits />
      //     },
      //     {
      //       path: 'subscription-settings',
      //       element: <SubscriptionSettings />
      //     }
      //   ]
      // }
    ]
  }
]);

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('react-root')).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <AuthProvider>
            <DataProvider>
              <AlarmProvider>
                <ModalProvider>
                  <SlideContentProvider>
                    <NoteContentProvider>
                      <SideBarContentProvider>
                        <Onboarding />
                        <RouterProvider router={router} />
                      </SideBarContentProvider>
                    </NoteContentProvider>
                  </SlideContentProvider>
                </ModalProvider>
              </AlarmProvider>
            </DataProvider>
          </AuthProvider>
        </AnimatePresence>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
});

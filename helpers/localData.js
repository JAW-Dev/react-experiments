import { csrfToken } from '@rails/ujs';
import AlLogoIcon from '../../../../assets/images/reskin-images/icon--al-logo.svg';
import ResourcesIcon from '../../../../assets/images/reskin-images/icon--resources.svg';
import UserIcon from '../../../../assets/images/reskin-images/icon--user.svg';
import LogOutIcon from '../../../../assets/images/reskin-images/icon--log-out.svg';
import UsersIcon from '../../../../assets/images/reskin-images/icon--users.svg';
import EventsIcon from '../../../../assets/images/reskin-images/icon--events.svg';
import StarIcon from '../../../../assets/images/reskin-images/icon--star2.svg';
import SupportIcon from '../../../../assets/images/reskin-images/icon--support.svg';
import NotesIcon from '../../../../assets/images/reskin-images/icon--note.svg';

import UsersV2Icon from '../../../../assets/images/reskin-images/icon--users-v2.svg';
import ModulesIcon from '../../../../assets/images/reskin-images/icon--modules.svg';
import BehaviorsIcon from '../../../../assets/images/reskin-images/icon--behaviors.svg';
import SalesIcon from '../../../../assets/images/reskin-images/icon--sales.svg';
import WebinarsIcon from '../../../../assets/images/reskin-images/icon--webinars.svg';
import ToolIcon from '../../../../assets/images/reskin-images/icon--tool.svg';

export const hamburgerDropdownList = [
  {
    icon: ToolIcon,
    text: 'Admin Dashboard',
    path: '/v2/admin/user',
    onClick: () => {},
    subList: [],
    role: 'admin'
  },
  {
    icon: AlLogoIcon,
    text: 'Dashboard',
    path: '/v2',
    onClick: () => {},
    subList: []
  },
  // {
  //   icon: StarIcon,
  //   text: 'Help to Habit',
  //   path: '/v2/help-to-habit',
  //   onClick: () => {},
  //   subList: [],
  // },
  {
    icon: StarIcon,
    text: 'Modules',
    path: '/v2/program/2/15',
    onClick: () => {},
    subList: []
  },
  {
    icon: EventsIcon,
    text: 'Events',
    path: '/program/events',
    onClick: () => {},
    subList: []
  },
  {
    icon: NotesIcon,
    text: 'Notes',
    path: '/v2/program/notes',
    onClick: () => {},
    subList: []
  },
  {
    icon: UsersIcon,
    text: 'Community Discussion Groups',
    path: '/program/resources/study-groups',
    onClick: () => {},
    subList: []
  },
  {
    icon: ResourcesIcon,
    text: 'Resources',
    path: null,
    onClick: () => {},
    subList: [
      // {
      //   path: '/program/events',
      //   text: 'Events',
      // },
      {
        path: 'https://admiredleadership.com/field-notes/archive/',
        text: 'Field Notes'
      },
      {
        path: '/program/AL-Direct',
        text: 'AL Direct'
      },
      {
        path: '/program/resources/study-groups',
        text: 'Cohorts'
      },
      {
        path: 'mailto:support@admiredleadership.com?subject=Admired%20Leadership%20Podcast%20Feeds%20Request&body=Hello,%20I%20am%20reaching%20out%20today%20to%20request%20my%20personal%20Admired%20Leadership%20Podcast%20Feed%20links.%20Thanks!',
        text: 'Get Podcast Link'
      },
      {
        path: '/program/book-summaries',
        text: 'Book Summaries'
      }
    ]
  },
  {
    icon: SupportIcon,
    text: 'Support',
    path: '/help',
    onClick: () => {},
    subList: []
  }
  // {
  //   icon: GiftIcon,
  //   text: 'Gift a Course',
  //   path: '/gift',
  //   onClick: () => {},
  //   subList: []
  // }
];

export const userDropdownList = [
  {
    icon: UserIcon,
    text: 'View Profile Settings',
    path: '/users/profile',
    onClick: () => {},
    subList: []
  },
  {
    icon: LogOutIcon,
    text: 'Sign Out',
    path: null,
    onClick: () => {
      fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken()
        }
      }).then(() => {
        window.location.href = '/users/sign_in';
      });
    },
    subList: []
  }
];


export const adminMenu = [
  {
    icon: UsersV2Icon,
    text: 'Manage Users',
    description: 'Add, update, or remove users and assign their access level',
    route: '/v2/admin/user',
    disabled: false
  },
  {
    icon: ModulesIcon,
    text: 'Manage Modules',
    description: 'Add, update, or remove modules and behavior bundles',
    route: '/admin/program/modules',
    disabled: true
  },
  {
    icon: BehaviorsIcon,
    text: 'Manage Behaviors',
    description: 'Add, update, or remove behavior videos',
    route: '/admin/program/behaviors',
    disabled: true
  },
  {
    icon: WebinarsIcon,
    text: 'Manage Webinars',
    description: 'Add, update, or remove webinars',
    route: '/admin/program/webinars',
    disabled: true
  },
  {
    icon: SalesIcon,
    text: 'View Orders',
    description: 'View completed orders and gifts',
    route: '/admin/program/orders',
    disabled: true
  }
];

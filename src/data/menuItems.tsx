import { FaHome, FaUsers, FaCog } from 'react-icons/fa';

interface MenuItem {
	title: string;
	icon: JSX.Element;
	link: string;
}

const menuItems = [
	{ title: 'Home', icon: <FaHome />, link: '/' },
	{ title: 'Users', icon: <FaUsers />, link: '/users' },
	{ title: 'Settings', icon: <FaCog />, link: '/settings' },
];

export default menuItems;
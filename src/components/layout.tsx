'use client';

import { useState } from 'react';
import { FaBars, FaHome, FaUser, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import Sidebar from './sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const menuItems = [
		{ title: 'Home', icon: <FaHome />, link: '/' },
		{ title: 'Users', icon: <FaUser />, link: '/users' },
		{ title: 'Settings', icon: <FaCog />, link: '/settings' },
	];

	const toggleMenu = () => {
		if (isMobile) {
			setIsMobileMenuOpen(!isMobileMenuOpen);
		} else {
			setIsMenuCollapsed(!isMenuCollapsed);
		}
	};

	return (
		<div className="flex h-screen">
			<Sidebar
				isMenuCollapsed={isMenuCollapsed}
				isMobileMenuOpen={isMobileMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<div className="flex-1 flex flex-col">
				<header className="shadow p-4 flex items-center justify-between">
					<button onClick={toggleMenu} className={`text-2xl md:hidden`}>
						<FaBars />
					</button>
					<h1 className="text-2xl">Dashboard</h1>
				</header>
				<main className="flex-1 overflow-y-auto p-4">{children}</main>
				<footer className="shadow p-4 text-center">
					&copy; 2024 Admin Dashboard
				</footer>
			</div>
		</div>
	);
};

export default Layout;

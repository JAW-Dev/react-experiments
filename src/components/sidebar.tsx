import { useState } from 'react';
import { FaBars, FaHome, FaUser, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface SidebarProps {
	isMenuCollapsed: boolean;
	isMobileMenuOpen: boolean;
	toggleMenu: () => void;
}

const Sidebar = ({ isMenuCollapsed, isMobileMenuOpen, toggleMenu }: SidebarProps) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const menuItems = [
		{ title: 'Home', icon: <FaHome />, link: '/' },
		{ title: 'Users', icon: <FaUser />, link: '/users' },
		{ title: 'Settings', icon: <FaCog />, link: '/settings' },
	];

	return (
		<aside
			className={`${isMobile ? 'fixed z-50 inset-0' : 'relative'
				} ${isMenuCollapsed ? 'w-14' : 'w-64'} ${isMobile && !isMobileMenuOpen ? 'w-0 hidden' : ''
				} transition-all duration-300 border-r-2 bg-background`}
		>
			<Card className={cn("flex items-center justify-between p-4 border-0 border-b")}>
				<button onClick={toggleMenu} className="text-2xl">
					<FaBars />
				</button>
			</Card>
			<nav className="mt-4">
				<ul>
					{menuItems.map((item) => (
						<li key={item.title} className="hover:bg-primary-foreground min-h-[58px]">
							<Link href={item.link} className="flex items-center p-4 leading-none">
								<span className="text-xl">{item.icon}</span>
								<span className={`${isMenuCollapsed ? 'hidden' : 'ml-4'} transition-all duration-300`}>
									{item.title}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;

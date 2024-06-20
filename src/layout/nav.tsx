'use client';

import React from 'react';
import DarkmodeToggle from "@/components/darkmode-toggle";
import { Button } from "@/components/ui/button";
import { HiBars3 } from "react-icons/hi2";
import useWindowResize from '@/hooks/useWindowResize';
import useNavigation from '@/hooks/useNavigation';

const Nav = () => {
	const {
		isCollapsed,
		isManualCollapse,
		isMobile,
		toggleCollapse,
		setIsCollapsed,
		setIsMobile,
	} = useNavigation();

	const handleResize = () => {
		const width = window.innerWidth;

		const isMobile = width < 640;
		const isTablet = width >= 640 && width < 1024;

		setIsCollapsed(isMobile || isTablet ? true : isManualCollapse);
		setIsMobile(isMobile);
	};

	useWindowResize(handleResize);

	return (
		<div>
			<Button variant="link" size="icon" className="p-1 top-[1rem] left-[1rem] focus:outline-none absolute" onClick={toggleCollapse}>
				<HiBars3 size={`100%`} title="menu" />
			</Button>
			<nav className={`flex flex-col gap-4 border h-full transition-all min-h-screen pt-16 ${isCollapsed ? (isMobile ? 'w-0 p-0' : 'w-[5rem]  p-4') : 'w-64  p-4'}`}>
				<p>isColasped: {isCollapsed ? 'True' : 'False'}</p>
				<p>Manual: {isManualCollapse ? 'True' : 'False'}</p>
				<ul className="flex flex-col gap-2">
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
					<li>
						<a href="/contact">Contact</a>
					</li>
				</ul>
				<DarkmodeToggle />
			</nav>
		</div>
	)
}

export default Nav;
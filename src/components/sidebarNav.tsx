import React from 'react';
import Link from 'next/link';
import menuItems from '@/data/menuItems';

/**
 * SidebarNav component displays navigation links in the sidebar.
 * @param {object} props - Component props.
 * @param {boolean} props.isMenuCollapsed - Whether the sidebar menu is collapsed or expanded.
 */
const SidebarNav: React.FC<SidebarNavProps> = ({ isMenuCollapsed }) => (
	<nav className="mt-4">
		<ul>
			{menuItems.map((item) => (
				<li key={item.title} className="hover:bg-primary-foreground min-h-[58px]">
					<Link href={item.link} className="flex items-center p-4 leading-none" role="menuitem">
						<span className="text-xl">{item.icon}</span>
						<span className={`${isMenuCollapsed ? 'hidden' : 'ml-4'} transition-all duration-300`}>
							{item.title}
						</span>
					</Link>
				</li>
			))}
		</ul>
	</nav>
);

/**
 * Props for the SidebarNav component.
 */
interface SidebarNavProps {
	isMenuCollapsed: boolean;
}

export default SidebarNav;
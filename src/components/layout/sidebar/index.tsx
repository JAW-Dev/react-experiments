import { FaBars } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import SidebarNav from './sidebarNav';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';

/**
 * Sidebar component that displays a collapsible sidebar navigation.
 * @param {object} props - Component props.
 * @param {boolean} props.isMenuCollapsed - Whether the menu is collapsed or expanded.
 * @param {boolean} props.isMobileMenuOpen - Whether the mobile menu is currently open.
 * @param {Function} props.toggleMenu - Function to toggle the sidebar menu visibility.
 */
const Sidebar = ({ isMenuCollapsed, isMobileMenuOpen, toggleMenu }: SidebarProps) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	return (
		<aside
			className={cn(
				`${isMobile ? 'fixed z-50 inset-0' : 'relative'
				} ${isMenuCollapsed ? 'w-14' : 'w-64'} ${isMobile && !isMobileMenuOpen ? 'w-0 hidden' : ''
				} transition-all duration-300 border-r-2 shadow bg-background`
			)}
			role="navigation"
		>
			<Card className={cn("flex items-center justify-between p-4 rounded-none border-0 border-b")}>
				<Button onClick={toggleMenu} className={cn("text-2xl p-0 py-3 h-0 text-white bg-transparent leading-none ")} aria-label="Toggle Menu">
					<FaBars />
				</Button>
			</Card>
			<SidebarNav isMenuCollapsed={isMenuCollapsed} />
		</aside>
	);
};

/**
 * Props for the Sidebar component.
 */
interface SidebarProps {
	isMenuCollapsed: boolean;
	isMobileMenuOpen: boolean;
	toggleMenu: () => void;
}

export default Sidebar;

import { FaBars } from 'react-icons/fa';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

/**
 * Header component that displays a header with a menu toggle button and user information.
 * @param {object} props - Component props.
 * @param {Function} props.toggleMenu - Function to toggle the menu visibility.
 * @param {string} props.className - Class name to be applied to the header.
 */
const Header = ({ toggleMenu, className }: HeaderProps) => {
	return (
		<header className="flex items-centerjustify-between">
			<Card className={cn("flex items-end justify-between rounded-none border-0 border-b w-full p-4", className)} role="banner">
				<Button onClick={toggleMenu} className={cn("text-2xl p-0 py-3 h-0 text-white bg-transparent md:hidden leading-none")} aria-label="Toggle Menu">
					<FaBars />
				</Button>
				<h1 className="text-2xl leading-none">Dashboard</h1>
				<div>User</div>
			</Card>
		</header>
	);
};

interface HeaderProps {
	toggleMenu: () => void;
	className: string;
}

export default Header;
'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';

/**
 * Layout component that defines the overall structure of the application layout.
 * It includes a sidebar, header, main content area, and footer.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 767 });

	/**
	* Toggles the menu visibility based on the device type.
	* If on mobile, toggles the mobile menu open/close.
	* If on desktop, toggles the sidebar collapsed/expanded.
	*/
	const toggleMenu = () => {
		if (isMobile) {
			setIsMobileMenuOpen(!isMobileMenuOpen);
		} else {
			setIsMenuCollapsed(!isMenuCollapsed);
		}
	};

	return (
		<QueryClientProvider client={new QueryClient()}>
			<div className="flex h-screen">
				<Sidebar isMenuCollapsed={isMenuCollapsed} isMobileMenuOpen={isMobileMenuOpen} toggleMenu={toggleMenu} />
				<div className="flex-1 flex flex-col">
					<Header className="bg-muted/40" toggleMenu={toggleMenu} />
					<main className="flex-1 overflow-y-auto p-4 bg-muted/40" role="main">{children}</main>
					<Footer className="bg-muted/40" />
				</div>
			</div>
		</QueryClientProvider>
	);
};

export default Layout;

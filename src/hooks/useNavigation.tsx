import { useState } from 'react';

const useNavigation = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isManualCollapse, setIsManualCollapse] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
		setIsManualCollapse(!isManualCollapse);
	};

	return {
		isCollapsed,
		isManualCollapse,
		isMobile,
		toggleCollapse,
		setIsCollapsed,
		setIsMobile,
	};
};

export default useNavigation;
import { useEffect } from 'react';

const useWindowResize = (callback: () => void) => {
	useEffect(() => {
		window.addEventListener('resize', callback);

		// Cleanup
		return () => {
			window.removeEventListener('resize', callback);
		};
	}, [callback]);
};

export default useWindowResize;
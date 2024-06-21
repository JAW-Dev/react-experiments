export interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
}

export interface User {
	id: string;
	firstName?: string;
	lastName?: string;
	email: string;
	phoneNumber?: string;
	address?: Address;
	avatar?: string;
	bio?: string;
}

export interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	numbersToShow: number;
}
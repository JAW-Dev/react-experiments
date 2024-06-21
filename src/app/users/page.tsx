'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import PaginationComp from '@/components/pagination';
import { useQuery } from 'react-query';

/**
 * Users page component that fetches and displays a list of users with pagination.
 */
const UsersPage = () => {
	const [page, setPage] = useState<number>(1); // Current page number
	const itemsPerPage = 10; // Number of items per page
	const numbersToShow = 4; // Number of page numbers to show in pagination component

	// Query users from API
	const { data, error, isLoading } = useQuery<User[]>('users', async () => {
		const response = await fetch('http://localhost:3001/users');
		if (!response.ok) {
			throw new Error('Failed to load users');
		}
		return response.json();
	});

	// Ensure data is defined before accessing it
	const totalItems = data ? data.length : 0;
	// Calculate currently visible data based on pagination
	const currentPageData = data ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];

	// Render loading indicator while fetching data
	if (isLoading) return <div>Loading...</div>;

	// Render error message if fetch fails
	if (error) return <div>Error fetching users</div>;

	// Render users list and pagination component when data is loaded
	return (
		<div>
			<h1>Users Page</h1>
			<ul>
				{currentPageData?.map((user) => (
					<li key={user.id}>
						{user.firstName} {user.lastName} - {user.email}
					</li>
				))}
			</ul>
			<PaginationComp
				totalItems={totalItems} // Total number of users
				itemsPerPage={itemsPerPage} // Number of items per page
				currentPage={page} // Current active page
				onPageChange={setPage} // Function to change active page
				numbersToShow={numbersToShow} // Number of page numbers to show in pagination component
			/>
		</div>
	);
};

export default UsersPage
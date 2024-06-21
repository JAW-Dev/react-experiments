'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import PaginationComp from '@/components/pagination';

/**
 * Users page component that fetches and displays a list of users with pagination.
 */
const UsersPage = () => {
	// State variables
	const [page, setPage] = useState<number>(1); // Current page number
	const [data, setData] = useState<User[]>([]); // Array of users fetched from API
	const [error, setError] = useState<Error | null>(null); // Error state for API fetch
	const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state while fetching data
	const pageSize = 10; // Number of items per page

	// Fetch users from API on component mount
	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true); // Start loading
			try {
				const response = await fetch('http://localhost:3001/users'); // Fetch users from API
				const result: User[] = await response.json(); // Parse JSON response
				setData(result); // Set fetched data to state
			} catch (err) {
				setError(err as Error); // Catch and set error if fetch fails
			} finally {
				setIsLoading(false); // Stop loading, whether successful or not
			}
		};

		fetchUsers(); // Invoke fetchUsers on component mount
	}, []); // Empty dependency array ensures this effect runs only once, on mount

	// Calculate currently visible data based on pagination
	const currentPageData = data.slice((page - 1) * pageSize, page * pageSize);

	// Render loading indicator while fetching data
	if (isLoading) return <div>Loading...</div>;

	// Render error message if fetch fails
	if (error) return <div>Error fetching users</div>;

	// Render users list and pagination component when data is loaded
	return (
		<div>
			<h1>Users Page</h1>
			<ul>
				{currentPageData.map((user) => (
					<li key={user.id}>
						{user.firstName} {user.lastName} - {user.email}
					</li>
				))}
			</ul>
			<PaginationComp
				totalItems={data.length} // Total number of users
				itemsPerPage={pageSize} // Number of items per page
				currentPage={page} // Current active page
				onPageChange={setPage} // Function to change active page
				numbersToShow={5} // Number of page numbers to show in pagination component
			/>
		</div>
	);
};

export default UsersPage
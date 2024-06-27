"use client";

import React from 'react';
import { useQuery } from 'react-query';
import DataTable from '@/components/dataTable/dataTable';
import { User, columns } from "./columns";

type Props = {}

function UsersTable({ }: Props) {
	// Query users from API
	const { data, error, isLoading } = useQuery<User[]>('users', async () => {
		const response = await fetch('http://localhost:3001/users');
		if (!response.ok) {
			throw new Error('Failed to load users');
		}
		return response.json();
	});

	// Render loading indicator while fetching data
	if (isLoading) return <div>Loading...</div>;

	// Render error message if fetch fails
	if (error) return <div>Error fetching users</div>;

	// Render users list and pagination component when data is loaded
	return (
		<div>
			<h1 className="text-3xl mb-4 pt-2">Users</h1>
			<DataTable columns={columns} data={data} />
		</div>
	);
}

export default UsersTable;
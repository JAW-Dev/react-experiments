import React from 'react';
import UsersTable from '@/components/users/usersTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'React EX | Users Page',
	description: 'The user page',
};

/**
 * Users page component that fetches and displays a list of users with pagination.
 */
const UsersPage = () => {
	return (
		<div>
			<UsersTable />
		</div>
	);
};

export default UsersPage
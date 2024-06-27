"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaUser } from 'react-icons/fa';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Address = {
	street: string
	city: string
	state: string
	zipCode: string
}

export type User = {
	id: string
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	address: Address
	avatar: string
	bio: string
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "avatar",
		header: "Avatar",
		cell: ({ row }) => {
			const url: string = row.getValue("avatar");
			const avatar = <img className="w-10 h-10 rounded-full" src={url} />
			const dummy = <FaUser />;

			return url ? avatar : dummy;
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: "firstName",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					First Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: "lastName",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Last Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
	},
	{
		accessorKey: "address",
		header: "Address",
		cell: ({ row }) => {
			const address: Address = row.getValue("address");

			return `${address?.street} ${address?.city}, ${address?.state} ${address?.zipCode}`;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem className="hover:cursor-pointer" onClick={() => navigator.clipboard.writeText(user.id)}>
							Copy user ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="hover:cursor-pointer">View User</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
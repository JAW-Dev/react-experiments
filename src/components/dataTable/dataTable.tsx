"use client"

import React, { useState } from 'react';
import {
	ColumnDef,
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input"
import { DataTablePagination } from './dataTablePagination';
import { DataTableColumnToggle } from './dataTableColumnToggle';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	usePagination: boolean,
	useColumnToggle: boolean
}

const DataTable = <TData, TValue>({
	columns,
	data,
	usePagination,
	useColumnToggle
}: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			pagination,
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	return (
		<>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter emails..."
					value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("email")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				{useColumnToggle !== false ? <DataTableColumnToggle table={table} /> : null}
			</div>
			{usePagination !== false ? <div className="py-4"><DataTablePagination table={table} /></div> : null}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{usePagination !== false ? <div className="py-4"><DataTablePagination table={table} /></div> : null}
		</>
	);
}

export default DataTable;
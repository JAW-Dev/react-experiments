import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Assuming utility function for classNames
import { PaginationProps } from '@/types'; // Assuming '@/types' contains PaginationProps type definition
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Pagination component that displays a list of page numbers and navigation buttons.
 * @param {object} props - Component props.
 * @param {number} props.totalItems - Total number of items to be paginated.
 * @param {number} props.itemsPerPage - Number of items to display per page.
 * @param {number} props.currentPage - Current page number.
 * @param {Function} props.onPageChange - Function to call when a page is clicked.
 * @param {number} props.numbersToShow - Number of page numbers to show.
 */
const PaginationComp: React.FC<PaginationProps> = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	numbersToShow
}) => {
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		// Calculate total pages based on total items and items per page
		if (totalItems > 0 && itemsPerPage > 0) {
			setTotalPages(Math.ceil(totalItems / itemsPerPage));
		} else {
			setTotalPages(0);
		}
	}, [totalItems, itemsPerPage]); // Update when totalItems or itemsPerPage change

	const renderPagination = () => {
		if (totalPages <= 1) {
			return null; // Render nothing if only one page or no pages
		}

		// Logic to determine which pages to display
		let start = Math.max(1, currentPage - Math.floor(numbersToShow / 2));
		let end = start + numbersToShow - 1;

		if (end > totalPages) {
			end = totalPages;
			start = Math.max(1, end - numbersToShow + 1);
		}

		const pages = [];
		for (let i = start; i <= end; i++) {
			pages.push(
				<PaginationItem key={i} className={cn("rounded", currentPage === i ? 'bg-accent' : '')}>
					<PaginationLink href="#" onClick={() => onPageChange(i)}>
						{i}
					</PaginationLink>
				</PaginationItem>
			);
		}

		// Add ellipsis if necessary
		if (start > 1) {
			pages.unshift(
				<PaginationItem key="ellipsis-start">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}

		if (end < totalPages) {
			pages.push(
				<PaginationItem key="ellipsis-end">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}

		return pages;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} />
				</PaginationItem>
				{renderPagination()}
				<PaginationItem>
					<PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationComp;

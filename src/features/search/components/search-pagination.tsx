import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SearchPaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export const SearchPagination = ({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
}: SearchPaginationProps) => {
	const startIndex = (currentPage - 1) * itemsPerPage + 1;
	const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="mt-8">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => onPageChange(currentPage - 1)}
							className={
								currentPage === 1 ? "pointer-events-none opacity-50" : ""
							}
						/>
					</PaginationItem>

					{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
						let pageNumber: number;
						if (totalPages <= 5) {
							pageNumber = i + 1;
						} else if (currentPage <= 3) {
							pageNumber = i + 1;
						} else if (currentPage >= totalPages - 2) {
							pageNumber = totalPages - (4 - i);
						} else {
							pageNumber = currentPage - 2 + i;
						}

						return (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									onClick={() => onPageChange(pageNumber)}
									isActive={pageNumber === currentPage}
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						);
					})}

					<PaginationItem>
						<PaginationNext
							onClick={() => onPageChange(currentPage + 1)}
							className={
								currentPage === totalPages
									? "pointer-events-none opacity-50"
									: ""
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			<div className="mt-2 text-center text-sm text-muted-foreground">
				Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
				{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} dogs
			</div>
		</div>
	);
};

import { Skeleton } from "@/components/ui/skeleton";

export const SearchFiltersSkeleton = () => {
	return (
		<div
			data-testid="search-filters-skeleton"
			className="flex gap-4 mb-6 flex-wrap items-start motion-safe:animate-fade-down motion-safe:animate-duration-500"
		>
			{/* Breed select */}
			<div className="w-[200px]">
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Sort select */}
			<div className="w-[200px]">
				<Skeleton className="h-10 w-full" />
			</div>

			{/* Age inputs */}
			<div className="flex gap-2 items-center">
				<Skeleton className="h-10 w-24" />
				<span>to</span>
				<Skeleton className="h-10 w-24" />
			</div>

			{/* Match button */}
			<Skeleton className="h-10 w-[140px]" />
		</div>
	);
};

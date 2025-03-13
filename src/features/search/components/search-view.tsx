"use client";

import { LogoutButton } from "@/components/logout-button";
import { useToast } from "@/hooks/use-toast";
import * as api from "@/lib/api";
import { searchFiltersSchema } from "@/lib/schemas";
import type { Dog } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { DogCard } from "./dog-card";
import { DogCardSkeleton } from "./dog-card-skeleton";
import { SearchFilters } from "./search-filters";
import { SearchFiltersSkeleton } from "./search-filters-skeleton";
import { SearchPagination } from "./search-pagination";

type SearchFiltersFormData = z.infer<typeof searchFiltersSchema>;

interface SearchResults {
	dogs: Dog[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
}

const extractCursorFromUrl = (url: string | null) => {
	if (!url) return null;
	try {
		const urlObj = new URL(url);
		return urlObj.searchParams.get("from");
	} catch {
		// If the URL is relative, create a URL with a base
		try {
			const urlObj = new URL(url, "http://dummy.com");
			return urlObj.searchParams.get("from");
		} catch {
			return null;
		}
	}
};

const ITEMS_PER_PAGE = 20;

export const SearchView = () => {
	const [favorites, setFavorites] = useState<Set<string>>(new Set());
	const [selectedBreed, setSelectedBreed] = useQueryState("breed");
	const [ageMin] = useQueryState("ageMin", parseAsInteger.withDefault(0));
	const [ageMax] = useQueryState("ageMax", parseAsInteger);
	const [sortOrder] = useQueryState("sort");
	const [cursor, setCursor] = useQueryState("from");

	const { toast } = useToast();

	const {
		register,
		watch,
		formState: { errors },
	} = useForm<SearchFiltersFormData>({
		resolver: zodResolver(searchFiltersSchema),
		defaultValues: {
			breed: selectedBreed || undefined,
			sort: sortOrder as SearchFiltersFormData["sort"] | undefined,
			from: cursor || undefined,
			ageMin: ageMin !== null ? ageMin : undefined,
			ageMax: ageMax !== null ? ageMax : undefined,
		},
	});

	// Fetch breeds for the filter dropdown
	const { data: breeds, isLoading: isBreedsLoading } = useQuery({
		queryKey: ["breeds"],
		queryFn: async () => {
			const breeds = await api.getBreeds();
			return breeds.map((breed) => ({
				value: breed,
				label: breed,
			}));
		},
	});

	// Fetch dogs based on filters
	const { data: searchResults, isLoading: isSearchLoading } =
		useQuery<SearchResults>({
			queryKey: ["dogs", selectedBreed, cursor, sortOrder, ageMin, ageMax],
			queryFn: async () => {
				const params: {
					size: number;
					sort: string;
					breeds?: string[];
					ageMin?: number;
					ageMax?: number;
					from?: string;
				} = {
					size: ITEMS_PER_PAGE,
					sort: sortOrder ?? "breed:asc",
				};

				if (selectedBreed) {
					params.breeds = [selectedBreed];
				}
				if (ageMin > 0) {
					params.ageMin = ageMin;
				}
				if (ageMax != null) {
					params.ageMax = ageMax;
				}
				if (cursor) {
					params.from = cursor;
				}

				const results = await api.searchDogs(params);
				if (results.resultIds.length > 0) {
					const dogs = await api.getDogs(results.resultIds);
					return {
						dogs,
						total: results.total,
						nextCursor: extractCursorFromUrl(results.next ?? null),
						prevCursor: extractCursorFromUrl(results.prev ?? null),
					};
				}
				return {
					dogs: [],
					total: 0,
					nextCursor: null,
					prevCursor: null,
				};
			},
		});

	const handleFavoriteToggle = (dogId: string) => {
		setFavorites((prev) => {
			const next = new Set(prev);
			next.has(dogId) ? next.delete(dogId) : next.add(dogId);
			return next;
		});
	};

	const handleMatch = async () => {
		if (favorites.size === 0) return;
		try {
			const match = await api.matchDog(Array.from(favorites));
			if (match.match) {
				const [matchedDog] = await api.getDogs([match.match]);
				toast({
					title: `You've been matched with ${matchedDog.name}! 🎉`,
				});
			}
		} catch (error) {
			console.error("Failed to get match:", error);
			toast({
				title: "Failed to get match",
				description: "Please try again",
			});
		}
	};

	// Calculate current page and total pages
	const currentPage = searchResults?.total
		? Math.floor(Number(cursor || 0) / ITEMS_PER_PAGE) + 1
		: 1;
	const totalPages = searchResults?.total
		? Math.ceil(searchResults.total / ITEMS_PER_PAGE)
		: 0;

	// Handle page change
	const handlePageChange = (page: number) => {
		const newCursor = ((page - 1) * ITEMS_PER_PAGE).toString();
		setCursor(newCursor);
		// Smooth scroll to top
		if (typeof window !== "undefined") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<div className="min-h-screen p-6 relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-20 -left-20 w-96 h-96 bg-main/20 rounded-full blur-3xl" />
			<div className="absolute bottom-20 -right-20 w-96 h-96 bg-main/20 rounded-full blur-3xl" />

			<div className="relative max-w-7xl mx-auto">
				<div className="bg-bw rounded-xl border-4 border-border shadow-[var(--shadow)] p-8">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
						<div className="space-y-1">
							<h1 className="text-4xl font-bold tracking-tight">
								Find Your Perfect Dog
							</h1>
							<p className="text-text/70">
								Browse and favorite dogs to find your perfect match 🐕
							</p>
						</div>
						<LogoutButton />
					</div>

					<div className="mb-8">
						{isBreedsLoading ? (
							<SearchFiltersSkeleton />
						) : (
							<SearchFilters
								breeds={breeds}
								favoriteCount={favorites.size}
								onMatchClick={handleMatch}
							/>
						)}
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{isSearchLoading
							? Array.from({ length: 8 }).map((_, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<DogCardSkeleton key={index} />
								))
							: searchResults?.dogs.map((dog: Dog) => (
									<DogCard
										key={dog.id}
										dog={dog}
										isFavorited={favorites.has(dog.id)}
										onFavoriteToggle={handleFavoriteToggle}
									/>
								))}
					</div>

					{searchResults && searchResults.total > 0 && !isSearchLoading && (
						<div className="mt-8 flex justify-center">
							<SearchPagination
								currentPage={currentPage}
								totalPages={totalPages}
								itemsPerPage={ITEMS_PER_PAGE}
								totalItems={searchResults.total}
								onPageChange={handlePageChange}
							/>
						</div>
					)}

					{searchResults?.total === 0 && !isSearchLoading && (
						<div className="text-center py-12">
							<p className="text-2xl font-semibold mb-2">No dogs found</p>
							<p className="text-text/70">
								Try adjusting your filters to see more results
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

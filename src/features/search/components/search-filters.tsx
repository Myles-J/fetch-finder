import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { sortOrderMap } from "@/lib/constants";
import {
	parseAsFloat,
	parseAsString,
	parseAsStringLiteral,
	useQueryState,
	useQueryStates,
} from "nuqs";

type SortOrder = "breed:asc" | "breed:desc" | "age:asc" | "age:desc";

interface SearchFiltersProps {
	breeds: { value: string; label: string }[] | undefined;
	favoriteCount: number;
	onMatchClick: () => void;
}

export const SearchFilters = ({
	breeds,
	favoriteCount,
	onMatchClick,
}: SearchFiltersProps) => {
	const [selectedBreed, setSelectedBreed] = useQueryState(
		"breed",
		parseAsString.withDefault(""),
	);
	const [selectedSort, setSelectedSort] = useQueryState(
		"sort",
		parseAsStringLiteral([
			"breed:asc",
			"breed:desc",
			"age:asc",
			"age:desc",
		]).withDefault("breed:asc"),
	);

	const [ageRange, setAgeRange] = useQueryStates({
		ageMin: parseAsFloat.withDefault(0),
		ageMax: parseAsFloat.withDefault(0),
	});

	const onBreedChange = (value: string) => {
		setSelectedBreed(value);
	};

	const onSortChange = (value: string) => {
		setSelectedSort(
			value as SortOrder | ((old: SortOrder) => SortOrder | null) | null,
		).catch(console.error);
	};

	const onAgeChange = (changes: Partial<typeof ageRange>) => {
		setAgeRange(changes);
	};

	const onFindMatch = () => {
		onMatchClick();
	};

	return (
		<div className="flex gap-4 mb-6 flex-wrap items-start motion-safe:animate-fade-down motion-safe:animate-duration-500">
			<div className="w-[200px]">
				<Combobox
					options={breeds ?? []}
					onChange={onBreedChange}
					placeholder="Select breed"
					emptyText="No breeds found"
				/>
			</div>

			<div className="w-[200px]">
				<Select value={selectedSort} onValueChange={onSortChange}>
					<SelectTrigger>
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="breed:asc">Breed (A-Z)</SelectItem>
						<SelectItem value="breed:desc">Breed (Z-A)</SelectItem>
						<SelectItem value="age:asc">Age (Low to High)</SelectItem>
						<SelectItem value="age:desc">Age (High to Low)</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex gap-2 items-center">
				<div>
					<input
						type="number"
						min={0}
						placeholder="Min age"
						className="w-24 p-2 border-2 border-border rounded-base bg-background hover:border-black focus:border-black transition-colors duration-200"
						value={ageRange.ageMin || ""}
						onChange={(e) =>
							onAgeChange({ ageMin: Number.parseFloat(e.target.value) })
						}
					/>
				</div>
				<span>to</span>
				<div>
					<input
						type="number"
						min={0}
						placeholder="Max age"
						className="w-24 p-2 border-2 border-border rounded-base bg-background hover:border-black focus:border-black transition-colors duration-200"
						value={ageRange.ageMax || ""}
						onChange={(e) =>
							onAgeChange({ ageMax: Number.parseFloat(e.target.value) })
						}
					/>
				</div>
			</div>

			<Button
				onClick={onFindMatch}
				className="motion-safe:hover:scale-105 transition-transform duration-200"
			>
				Find Match ({favoriteCount})
			</Button>
		</div>
	);
};

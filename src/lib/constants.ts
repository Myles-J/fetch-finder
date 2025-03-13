export const sortOrderMap = {
	"breed:asc": "Breed (A-Z)",
	"breed:desc": "Breed (Z-A)",
	"name:asc": "Name (A-Z)",
	"name:desc": "Name (Z-A)",
	"age:asc": "Age (Youngest)",
	"age:desc": "Age (Oldest)",
} as const;

export const sortOrderKeys = Object.keys(
	sortOrderMap,
) as (keyof typeof sortOrderMap)[];

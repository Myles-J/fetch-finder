import { z } from "zod";
import { sortOrderKeys } from "./constants";

const sortOrderEnum = z.enum(sortOrderKeys as [string, ...string[]]);

export const searchFiltersSchema = z
	.object({
		breed: z.string().nullable(),
		sort: sortOrderEnum,
		from: z.string().optional(),
		ageMin: z.number().min(0).optional(),
		ageMax: z.number().min(0).optional(),
	})
	.refine(
		(data) => {
			// If both ageMin and ageMax are provided, ensure ageMin is less than or equal to ageMax
			if (data.ageMin != null && data.ageMax != null) {
				return data.ageMin <= data.ageMax;
			}
			return true;
		},
		{
			message: "Minimum age must be less than or equal to maximum age",
			path: ["ageMin"],
		},
	);

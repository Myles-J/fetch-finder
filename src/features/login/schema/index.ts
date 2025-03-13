import { z } from "zod";

export const loginSchema = z.object({
	name: z
		.string({
			required_error: "Name is required",
		})
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),
	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Please enter a valid email address"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

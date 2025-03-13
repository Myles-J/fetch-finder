"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type LoginFormData, loginSchema } from "@/features/login/schema";
import { useAuth } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
	const { login } = useAuth();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		try {
			await login(data.name, data.email);
		} catch (err) {
			setError("root", {
				message: "Login failed. Please try again.",
			});
		}
	};

	const error = errors.root?.message;

	return (
		<div className="flex items-center justify-center min-h-screen px-4">
			<div className="relative w-full max-w-md">
				{/* Decorative elements */}
				<div className="absolute -top-12 -left-12 w-24 h-24 bg-main rounded-full opacity-50 blur-2xl animate-pulse" />
				<div className="absolute -bottom-12 -right-12 w-32 h-32 bg-main rounded-full opacity-50 blur-2xl animate-pulse" />

				<div className="relative w-full p-8 bg-bw border-4 border-border shadow-[var(--shadow)] rounded-xl motion-safe:animate-fade-up motion-safe:animate-duration-500">
					<div className="mb-8 text-center space-y-2">
						<h1 className="text-5xl font-bold">🐕</h1>
						<h2 className="text-3xl font-bold">Fetch Finder</h2>
						<p className="text-sm text-text/70">
							Find your perfect furry friend
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm">Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter your name"
												className="hover:border-main focus:border-main transition-colors duration-200"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm">Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="Enter your email"
												className="hover:border-main focus:border-main transition-colors duration-200"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full bg-main hover:bg-main/90 text-white font-semibold motion-safe:hover:scale-105 transition-all duration-200"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Logging in...
									</>
								) : (
									"Find Your Perfect Dog"
								)}
							</Button>

							{error && (
								<p className="text-red-500 text-sm text-center motion-safe:animate-shake motion-safe:animate-duration-200">
									{error}
								</p>
							)}
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

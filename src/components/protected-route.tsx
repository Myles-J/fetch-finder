"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace("/login");
		}
	}, [user, router]);

	// Don't render children until we confirm authentication
	if (!user) {
		return null;
	}

	return <>{children}</>;
}

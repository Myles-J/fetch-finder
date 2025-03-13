"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const LogoutButton = () => {
	const { logout } = useAuth();
	return <Button onClick={logout}>Logout</Button>;
};

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import * as api from "./api";

const AUTH_COOKIE_NAME = "fetch_finder_auth";

interface AuthContextType {
	isAuthenticated: boolean;
	user: { name: string; email: string } | null;
	login: (name: string, email: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<{ name: string; email: string } | null>(
		null,
	);
	const router = useRouter();

	useEffect(() => {
		const savedUser = Cookies.get(AUTH_COOKIE_NAME);
		if (savedUser) {
			try {
				setUser(JSON.parse(savedUser));
			} catch (e) {
				Cookies.remove(AUTH_COOKIE_NAME);
			}
		}
	}, []);

	const login = async (name: string, email: string) => {
		try {
			await api.login({ name, email });
			const userData = { name, email };
			setUser(userData);
			Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(userData), { expires: 7 });

			const params = new URLSearchParams(window.location.search);
			const redirectTo = params.get("from") || "/search";
			router.push(redirectTo);
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await api.logout();
			setUser(null);
			Cookies.remove(AUTH_COOKIE_NAME);
			router.push("/login");
		} catch (error) {
			console.error("Logout failed:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

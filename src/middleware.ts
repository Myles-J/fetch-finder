import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/search", "/favorites"];
// Routes that should redirect to /search if user is already authenticated
const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
	const authCookie = request.cookies.get("fetch_finder_auth");
	const isAuthenticated = !!authCookie?.value;
	const path = request.nextUrl.pathname;

	// Redirect authenticated users away from auth pages
	if (isAuthenticated && authRoutes.includes(path)) {
		return NextResponse.redirect(new URL("/search", request.url));
	}

	// Protect routes that require authentication
	if (
		!isAuthenticated &&
		protectedRoutes.some((route) => path.startsWith(route))
	) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("from", path);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

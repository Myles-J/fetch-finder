import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	redirects: async () => [
		{
			source: "/",
			destination: "/search",
			permanent: true,
		},
	],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "frontend-take-home.fetch.com",
				pathname: "/dog-images/**",
			},
		],
	},
};

export default nextConfig;

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 text-center gap-6 motion-safe:animate-fade-down motion-safe:animate-duration-500">
			<div className="text-9xl font-bold">4🐾4</div>
			<h1 className="text-4xl font-bold">Ruh Roh!</h1>
			<p className="text-xl text-text/80 max-w-md">
				Looks like this page has gone for a walk and got lost. Don't worry
				though, you can always fetch your way back home!
			</p>
			<Link href="/search">
				<Button className="motion-safe:hover:scale-105 transition-transform duration-200">
					Back to the Dog Park 🏃‍♂️
				</Button>
			</Link>
		</div>
	);
}

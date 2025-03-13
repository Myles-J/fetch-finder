import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaceholderImageURL } from "@/lib/placeholder-img";
import type { Dog } from "@/lib/types";
import Image from "next/image";

interface DogCardProps {
	dog: Dog;
	isFavorited: boolean;
	onFavoriteToggle: (dogId: string) => void;
}

export const DogCard = ({
	dog,
	isFavorited,
	onFavoriteToggle,
}: DogCardProps) => {
	return (
		<Card className="group overflow-hidden motion-safe:animate-fade-up motion-safe:animate-duration-500 hover:scale-[1.02] transition-all duration-200">
			<CardHeader className="p-0">
				<div className="relative aspect-square w-full overflow-hidden">
					<Image
						src={dog.img}
						alt={dog.name}
						loader={({ src }) => src}
						placeholder="blur"
						blurDataURL={getPlaceholderImageURL(dog.img)}
						fill
						style={{ objectFit: "cover" }}
						className="transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
			</CardHeader>
			<CardContent className="p-4 space-y-4">
				<div>
					<CardTitle className="text-2xl mb-1">{dog.name}</CardTitle>
					<p className="text-text/70 text-sm">{dog.breed}</p>
				</div>

				<div className="flex justify-between items-center text-sm">
					<div className="space-y-1">
						<p className="text-text/70">Age</p>
						<p className="font-semibold">{dog.age} years</p>
					</div>
					<div className="space-y-1 text-right">
						<p className="text-text/70">Location</p>
						<p className="font-semibold">{dog.zip_code}</p>
					</div>
				</div>

				<Button
					variant={isFavorited ? "default" : "neutral"}
					className="w-full bg-main hover:bg-main/90 text-white font-semibold motion-safe:hover:scale-105 transition-all duration-200"
					onClick={() => onFavoriteToggle(dog.id)}
				>
					{isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
				</Button>
			</CardContent>
		</Card>
	);
};

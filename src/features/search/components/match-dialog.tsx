import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getPlaceholderImageURL } from "@/lib/placeholder-img";
import type { Dog } from "@/lib/types";
import Image from "next/image";

interface MatchDialogProps {
	isOpen: boolean;
	onClose: () => void;
	dog: Dog;
}

export const MatchDialog = ({ isOpen, onClose, dog }: MatchDialogProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="motion-safe:animate-fade-up motion-safe:animate-duration-300">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						You've been matched with {dog.name}! 🎉
					</DialogTitle>
				</DialogHeader>
				<div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden">
					<Image
						src={dog.img}
						alt={dog.name}
						loader={({ src }) => src}
						placeholder="blur"
						blurDataURL={getPlaceholderImageURL(dog.img)}
						fill
						style={{ objectFit: "cover" }}
						className="motion-safe:animate-fade motion-safe:animate-duration-500 motion-safe:animate-delay-200"
					/>
				</div>
				<div className="text-center space-y-2 motion-safe:animate-fade-up motion-safe:animate-duration-500 motion-safe:animate-delay-300">
					<p>Breed: {dog.breed}</p>
					<p>Age: {dog.age} years</p>
					<p>Location: {dog.zip_code}</p>
				</div>
				<DialogFooter>
					<Button
						onClick={onClose}
						className="w-full motion-safe:hover:scale-105 transition-transform duration-200"
					>
						Continue Browsing
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

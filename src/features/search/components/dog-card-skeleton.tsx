import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const DogCardSkeleton = () => {
	return (
		<Card className="overflow-hidden">
			<CardHeader className="p-0">
				<Skeleton className="aspect-square w-full" />
			</CardHeader>
			<CardContent className="p-4 space-y-4">
				<div>
					<Skeleton className="h-7 w-3/4 mb-1" />
					<Skeleton className="h-4 w-1/2" />
				</div>

				<div className="flex justify-between items-center">
					<div className="space-y-1">
						<Skeleton className="h-4 w-8" />
						<Skeleton className="h-4 w-16" />
					</div>
					<div className="space-y-1">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-12" />
					</div>
				</div>

				<Skeleton className="h-9 w-full" />
			</CardContent>
		</Card>
	);
};

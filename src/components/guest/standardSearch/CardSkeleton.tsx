import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex items-center space-x-4 mb-4 mt-4">
    <Skeleton className="h-[11rem] w-1/3 rounded-xl" />
    <div className="space-y-2 w-2/3">
      <Skeleton className="h-6 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-4 w-4/6 rounded" />
    </div>
  </div>
  );
}
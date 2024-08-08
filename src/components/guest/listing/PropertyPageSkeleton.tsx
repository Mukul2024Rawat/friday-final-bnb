// components/guest/listing/PropertyPageSkeleton.tsx
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const PropertyPageSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <Skeleton className="h-8 w-3/4 rounded mb-4" />
      <div className="grid grid-cols-4 gap-2 mb-4">
        <Skeleton className="h-64 w-full col-span-2 row-span-2 rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Skeleton className="h-6 w-1/2 rounded mb-2" />
          <Skeleton className="h-6 w-full rounded mb-2" />
          <Skeleton className="h-6 w-full rounded mb-2" />
          <Skeleton className="h-6 w-full rounded mb-2" />
          <Skeleton className="h-6 w-full rounded mb-2" />
        </div>
        <div className="md:col-span-1">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-64 w-full rounded-lg mt-4" />
    </div>
  );
};

export default PropertyPageSkeleton;

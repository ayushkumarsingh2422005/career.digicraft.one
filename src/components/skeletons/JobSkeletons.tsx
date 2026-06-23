import { Skeleton } from "@/components/skeletons/Skeleton";

export function JobCardSkeleton() {
    return (
        <div className="glass-effect rounded-2xl p-6">
            <div className="mb-3 flex justify-between">
                <Skeleton variant="dark" className="h-6 w-24 rounded-full" />
                <Skeleton variant="dark" className="h-5 w-5 rounded" />
            </div>
            <Skeleton variant="dark" className="mb-3 h-7 w-3/4" />
            <div className="mb-4 flex flex-wrap gap-3">
                <Skeleton variant="dark" className="h-4 w-28" />
                <Skeleton variant="dark" className="h-4 w-20" />
                <Skeleton variant="dark" className="h-4 w-16" />
            </div>
            <Skeleton variant="dark" className="mb-4 h-4 w-32" />
            <Skeleton variant="dark" className="h-4 w-full" />
            <Skeleton variant="dark" className="mt-2 h-4 w-2/3" />
        </div>
    );
}

export function JobsGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <JobCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function JobsFiltersSkeleton() {
    return (
        <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_11rem_11rem]">
            <Skeleton variant="dark" className="h-10 w-full rounded-lg" />
            <Skeleton variant="dark" className="h-10 w-full rounded-lg" />
            <Skeleton variant="dark" className="h-10 w-full rounded-lg" />
        </div>
    );
}

export function JobsPageSkeleton() {
    return (
        <>
            <div className="mb-12 space-y-3">
                <Skeleton variant="dark" className="h-10 w-64" />
                <Skeleton variant="dark" className="h-5 w-96 max-w-full" />
            </div>
            <JobsFiltersSkeleton />
            <JobsGridSkeleton count={6} />
        </>
    );
}

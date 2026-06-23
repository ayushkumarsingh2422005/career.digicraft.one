import { Skeleton } from "@/components/skeletons/Skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function AdminApplicationCardSkeleton() {
    return (
        <Card className="bg-white/90">
            <CardContent className="space-y-4 p-6">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 w-16 rounded-md" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-11 flex-1 rounded-md" />
                    <Skeleton className="h-11 w-11 rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
}

export function AdminApplicationsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <AdminApplicationCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function AdminJobRowSkeleton() {
    return (
        <Card>
            <CardContent className="flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-36 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
}

export function AdminJobsListSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <AdminJobRowSkeleton key={i} />
            ))}
        </div>
    );
}

export function AdminDashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-5 w-72" />
                    </div>
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 rounded-xl" />
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                </div>
            </main>
        </div>
    );
}

export function LoginFormSkeleton() {
    return (
        <div className="w-full max-w-md space-y-6 rounded-xl border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-56" />
            </div>
            <div className="space-y-5">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <Skeleton className="h-11 w-full rounded-md" />
            </div>
        </div>
    );
}

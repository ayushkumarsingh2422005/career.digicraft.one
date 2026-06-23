import { Skeleton } from "@/components/skeletons/Skeleton";
import PageShell from "@/components/PageShell";

export function JobDetailSkeleton() {
    return (
        <PageShell>
            <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
                <Skeleton variant="dark" className="mb-6 h-4 w-36" />
                <Skeleton variant="dark" className="mb-4 h-7 w-28 rounded-full" />
                <Skeleton variant="dark" className="mb-6 h-12 w-2/3 max-w-lg" />
                <div className="mb-12 flex flex-wrap gap-4 border-b border-white/10 pb-8">
                    <Skeleton variant="dark" className="h-4 w-32" />
                    <Skeleton variant="dark" className="h-4 w-24" />
                    <Skeleton variant="dark" className="h-4 w-20" />
                    <Skeleton variant="dark" className="h-4 w-28" />
                </div>
                <div className="space-y-10">
                    <div className="space-y-3">
                        <Skeleton variant="dark" className="h-6 w-40" />
                        <Skeleton variant="dark" className="h-4 w-full" />
                        <Skeleton variant="dark" className="h-4 w-full" />
                        <Skeleton variant="dark" className="h-4 w-4/5" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton variant="dark" className="h-6 w-36" />
                        <Skeleton variant="dark" className="h-4 w-full" />
                        <Skeleton variant="dark" className="h-4 w-5/6" />
                        <Skeleton variant="dark" className="h-4 w-2/3" />
                    </div>
                </div>
                <Skeleton
                    variant="dark"
                    className="mt-12 h-12 w-48 rounded-full"
                />
            </div>
        </PageShell>
    );
}

export function ApplicationFormSkeleton() {
    return (
        <PageShell>
            <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
                <Skeleton variant="dark" className="mb-6 h-4 w-40" />
                <div className="glass-effect rounded-2xl p-6 md:p-10">
                    <Skeleton variant="dark" className="mb-2 h-4 w-24" />
                    <Skeleton variant="dark" className="mb-8 h-8 w-2/3" />
                    <div className="mb-8 flex gap-2">
                        <Skeleton variant="dark" className="h-10 flex-1 rounded-lg" />
                        <Skeleton variant="dark" className="h-10 flex-1 rounded-lg" />
                        <Skeleton variant="dark" className="h-10 flex-1 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Skeleton variant="dark" className="h-4 w-20" />
                            <Skeleton variant="dark" className="h-10 w-full rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton variant="dark" className="h-4 w-16" />
                            <Skeleton variant="dark" className="h-10 w-full rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton variant="dark" className="h-4 w-16" />
                            <Skeleton variant="dark" className="h-10 w-full rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton variant="dark" className="h-4 w-20" />
                            <Skeleton variant="dark" className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                        <Skeleton variant="dark" className="h-11 w-28 rounded-full" />
                        <Skeleton variant="dark" className="h-11 w-24 rounded-full" />
                    </div>
                </div>
            </div>
        </PageShell>
    );
}

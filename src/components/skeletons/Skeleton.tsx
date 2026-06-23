import { cn } from "@/lib/utils";

interface SkeletonProps extends React.ComponentProps<"div"> {
    variant?: "dark" | "light";
}

export function Skeleton({
    className,
    variant = "light",
    ...props
}: SkeletonProps) {
    return (
        <div
            data-slot="skeleton"
            className={cn(
                "animate-pulse rounded-md",
                variant === "dark"
                    ? "bg-white/10"
                    : "bg-slate-200",
                className
            )}
            {...props}
        />
    );
}

export default function GridBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.18]">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(45,212,191,0.12) 1px, transparent 1px),
                         linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px)`,
                    backgroundSize: "4rem 4rem",
                }}
            />
        </div>
    );
}

import { cn } from "@/lib/utils";

type SectionLoaderProps = {
  className?: string;
  rows?: number;
};

const SectionLoader = ({ className, rows = 4 }: SectionLoaderProps) => {
  return (
    <div
      className={cn("w-full min-w-0 space-y-4 py-2", className)}
      aria-busy="true"
      aria-label="Učitavanje"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`stat-skel-${index}`}
            className="h-24 animate-pulse rounded-2xl bg-muted/70"
          />
        ))}
      </div>
      <div className="h-10 animate-pulse rounded-xl bg-muted/60" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={`card-skel-${index}`}
            className="h-40 animate-pulse rounded-2xl bg-muted/50"
            style={{ animationDelay: `${index * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionLoader;

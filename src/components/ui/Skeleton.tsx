import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  className,
  variant = "rect",
  animation = "pulse",
}: SkeletonProps) {
  const baseStyles = "bg-muted/30 overflow-hidden";

  const variants = {
    rect: "rounded-md",
    circle: "rounded-full",
    text: "rounded-sm h-4",
  };

  const animations = {
    pulse: "animate-pulse",
    wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
    none: "",
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], animations[animation], className)}
      aria-hidden="true"
    />
  );
}

interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: string;
}

export function ImageSkeleton({
  className,
  aspectRatio = "aspect-video",
}: ImageSkeletonProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted/20", aspectRatio, className)}>
      <Skeleton className="absolute inset-0" animation="wave" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/20 border-t-accent/60 rounded-full animate-spin" />
      </div>
    </div>
  );
}

interface CardSkeletonProps {
  showImage?: boolean;
  showTitle?: boolean;
  showText?: boolean;
  className?: string;
}

export function CardSkeleton({
  showImage = true,
  showTitle = true,
  showText = true,
  className,
}: CardSkeletonProps) {
  return (
    <div className={cn("space-y-4 p-6", className)}>
      {showImage && <ImageSkeleton />}
      {showTitle && (
        <div className="space-y-2">
          <Skeleton variant="text" className="h-6 w-3/4" animation="wave" />
          <Skeleton variant="text" className="h-4 w-1/2" animation="wave" />
        </div>
      )}
      {showText && (
        <div className="space-y-2">
          <Skeleton variant="text" className="w-full" animation="wave" />
          <Skeleton variant="text" className="w-5/6" animation="wave" />
          <Skeleton variant="text" className="w-4/6" animation="wave" />
        </div>
      )}
    </div>
  );
}

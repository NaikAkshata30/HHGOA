/**
 * Skeleton loading placeholders. The shimmer styling lives in the `.skeleton`
 * component class (see styles/main.css). `PageSkeleton` is a generic route
 * fallback used by <Suspense> around the lazy-loaded pages.
 */
export function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />
}

export function PageSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16"
    >
      <Skeleton className="h-8 w-44 rounded-full" />
      <Skeleton className="mt-7 h-12 w-3/4 max-w-xl rounded-2xl" />
      <Skeleton className="mt-3 h-12 w-1/2 max-w-md rounded-2xl" />
      <Skeleton className="mt-7 h-4 w-2/3 max-w-lg rounded-lg" />
      <Skeleton className="mt-2.5 h-4 w-1/2 max-w-md rounded-lg" />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
      </div>
    </div>
  )
}

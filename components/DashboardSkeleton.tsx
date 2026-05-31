export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-1/3 rounded-full bg-gray-200 animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="h-52 rounded-3xl bg-gray-200 animate-pulse" />
            <div className="mt-4 space-y-3">
              <div className="h-5 w-3/4 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-1/2 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-1/4 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

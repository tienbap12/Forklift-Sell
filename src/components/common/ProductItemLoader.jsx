export default function ProductItemLoader() {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-md border border-gray-100">
      <div className="animate-pulse">
        {/* Image placeholder */}
        <div className="aspect-square bg-gray-200" />

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded-full w-16"></div>
            <div className="h-4 bg-gray-200 rounded-full w-8"></div>
          </div>
        </div>
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
    </div>
  );
}

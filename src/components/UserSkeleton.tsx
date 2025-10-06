function UserSkeleton() {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow relative animate-pulse">
      <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded" />
      <div className="w-16 h-16 bg-gray-300 rounded-full mb-2" />
      <div className="h-5 bg-gray-300 rounded w-24 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-20" />
    </div>
  );
}

export default function UserSkeletonList({ count = 15 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <UserSkeleton key={i} />
      ))}
    </div>
  );
}

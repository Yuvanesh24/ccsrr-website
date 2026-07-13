export default function Loading() {
  return (
    <div className="py-24 text-center">
      <div className="max-w-md mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#E8E5E0] rounded w-48 mx-auto" />
          <div className="h-4 bg-[#E8E5E0] rounded w-64 mx-auto" />
          <div className="h-4 bg-[#E8E5E0] rounded w-56 mx-auto" />
        </div>
      </div>
    </div>
  );
}

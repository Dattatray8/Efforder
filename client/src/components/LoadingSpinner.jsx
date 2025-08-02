export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 text-lg">Loading products...</p>
    </div>
  );
}

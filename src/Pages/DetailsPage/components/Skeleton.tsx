const Skeleton = () => {
  return (
    <>
      <div className="p-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
        <div className="w-full max-h-88 mb-8 rounded bg-gray-700 animate-pulse aspect-video" />
        <div className="h-6 w-full animate-pulse rounded bg-gray-700" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-700 mt-4" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-700 mt-4" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-700 mt-4" />

        <div className="mt-4">
          <div className="h-6 w-1/4 animate-pulse rounded bg-gray-700" />
        </div>
      </div>
    </>
  );
};
export default Skeleton;

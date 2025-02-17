import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";
import { CollectionTypes } from "../types/RootTypes";
import { Link } from "react-router-dom";

function Collections() {
  const { data, error, isLoading } = useSWR<{
    data: CollectionTypes[];
  }>(`/collection`, fetcher);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="h-16 w-16 border-[6px] border-dotted border-sky-600 animate-spin rounded-full"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-sky-600 bg-white text-center py-4 shadow-lg">
        Book collections
      </h1>
      <div className="container mx-auto p-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data.map((collection, index) => (
          <Link
            key={index}
            to={`/${collection.collectionName}`}
            className="h-[250px] md:h-[400px] bg-gray-800 relative rounded-xl overflow-hidden"
          >
            <img
              src={collection.collectionImage}
              alt={collection.collectionName}
              className="h-full w-full object-cover"
            />
            <h1 className="p-2 text-white absolute bottom-0 left-0 bg-sky-600 w-full text-center">
              {collection.collectionName}
            </h1>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;

import useSWR from "swr";

import { Link, useParams } from "react-router-dom";
import { CollectionTypes } from "../types/RootTypes";
import { fetcher } from "../middlewares/Fetcher";

const CollectionDetail = () => {
  const { collectionName } = useParams();
  const { data, error, isLoading } = useSWR<{ data: CollectionTypes }>(
    `/collection/${collectionName}`,
    fetcher
  );

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Failed to load data. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="h-16 w-16 border-[6px] border-dotted border-sky-600 animate-spin rounded-full"></span>
      </div>
    );
  }

  return (
    <section className="h-screen overflow-y-auto">
      <div className="bg-white shadow-lg">
        <div className="p-4 text-center">
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-green-700 sm:text-4xl">
            {data?.data.collectionName}
          </h1>
          <p className="mt-4 text-xl">
            In this collection{" "}
            <span className="text-sky-600">({data?.data.books.length})</span>{" "}
            books
          </p>
        </div>
      </div>

      {data?.data.books.length == 0 ? (
        <h1 className="text-center opacity-60">Books are not available</h1>
      ) : null}

      <ul className="space-y-4 p-4">
        {data?.data.books.map((book, index) => (
          <li key={index}>
            <Link
              to={`/${data.data.collectionName}/${book.name}`}
              className="text-center block bg-sky-600 rounded-lg text-white py-3"
            >
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CollectionDetail;

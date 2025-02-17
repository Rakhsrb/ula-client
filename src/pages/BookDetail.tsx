import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";
import { BooksTypes } from "../types/RootTypes";

const BookDetail = () => {
  const { collectionName, bookName } = useParams();
  const { data, error, isLoading } = useSWR<{ data: BooksTypes }>(
    `/collection/${collectionName}/${bookName}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="animate-spin text-primary h-10 w-10 border-4 border-dotted rounded-full border-white"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive text-center mt-10">{error}</div>;
  }

  if (!data?.data) {
    return <div className="text-center mt-10">No book data available.</div>;
  }

  

  return (
    <section className="h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-sky-600 bg-white text-center py-4 shadow-lg">
        {data.data.name}
      </h1>
      <div className="p-4">
        <ul className="space-y-4">
          {data.data.levels.map((level, index) => (
            <li key={index}>
              <Link
                to={`/${collectionName}/${bookName}/${level.level}`}
                className="bg-sky-600 text-white block text-center py-4 rounded-lg"
              >
                {level.level}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BookDetail;

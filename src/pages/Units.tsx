import { Link, useParams } from "react-router-dom";
import { fetcher } from "../middlewares/Fetcher";
import { Unit } from "../types/RootTypes";
import { Headphones } from "lucide-react";
import useSWR from "swr";

const Units = () => {
  const { collectionName, bookName, level } = useParams();
  const { data, error, isLoading } = useSWR<{ data: Unit[] }>(
    `/collection/${collectionName}/${bookName}/${level}`,
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
        {level}
      </h1>
      <ul className="space-y-4 p-4">
        {data.data.map((unit, index) => (
          <li key={index}>
            <Link
              to={`/${collectionName}/${bookName}/${level}/${unit._id}`}
              className="bg-sky-600 text-white flex justify-between items-center p-4 rounded-lg"
            >
              <span>{unit.title}</span>
              <Headphones />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Units;

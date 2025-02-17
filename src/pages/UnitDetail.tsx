import { useParams } from "react-router-dom";
import { fetcher } from "../middlewares/Fetcher";
import { Unit } from "../types/RootTypes";
import useSWR from "swr";
import { AudioPlayer } from "../components/AudioPlayer";

const UnitDetail = () => {
  const { collectionName, bookName, level, unitId } = useParams();

  const { data, error, isLoading } = useSWR<{ data: Unit }>(
    `/collection/${collectionName}/${bookName}/${level}/${unitId}`,
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
    <div className="h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-sky-600 bg-white text-center py-4 shadow-lg">
        {data?.data?.title}
      </h1>
      <ul className="space-y-4 p-4">
        {data.data.audios.map((audio, index) => (
          <AudioPlayer key={index} title={audio.label} src={audio.file} />
        ))}
      </ul>
    </div>
  );
};

export default UnitDetail;

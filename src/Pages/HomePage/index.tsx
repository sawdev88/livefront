import { useNavigate } from "react-router";
import type { NewsType } from "../../types/NewsType";
import { useGetTopNews } from "./hooks/useGetTopNews";
import Loading from "../../components/Loading";
import Tile from "./components/Tile";
import Error from "../../components/Error";

const HomePage = () => {
  const { data, isPending, isError } = useGetTopNews();
  const navigate = useNavigate();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (!isPending && data?.length === 0) {
    return <p>No news available. Probably a good thing.</p>;
  }

  const handleArticleClick = (uri: string) => {
    navigate(`/details/${encodeURIComponent(uri)}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top News</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map((news: NewsType) => (
          <Tile
            key={news.uri}
            news={news}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>
    </div>
  );
};
export default HomePage;

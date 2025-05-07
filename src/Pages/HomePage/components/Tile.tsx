import type { NewsType } from "../../../types/NewsType";
import formatDate from "../../../utils/dateUtils";
import { memo } from "react";

type TileProps = {
  news: NewsType;
  onArticleClick: (uri: string) => void;
};

const Tile = ({ news, onArticleClick }: TileProps) => {
  return (
    <div
      onClick={() => {
        onArticleClick(news.uri);
      }}
      role="button"
      tabIndex={0}
      className="p-4 border rounded cursor-pointer hover:border-blue-500 transition-colors duration-200"
    >
      <div className="h-64">
        {/* news.multimedia[1] is a smaller image, would use a much better image for a fallback on prod :) */}
        <img
          src={
            news.multimedia[1]?.url ||
            news.multimedia[0]?.url ||
            "https://i.pravatar.cc"
          }
          alt={`Image ${news.title || "News image"}`}
          className="w-full h-auto rounded max-h-64 object-cover"
        />
      </div>

      <h2 className="text-xl font-bold mb-1 mt-2">{news.title}</h2>

      <p>{news.abstract}</p>
      <p className="mt-1">
        <i>{news.byline}</i>
      </p>
      <p className="mt-1 opacity-90">{formatDate(news.published_date)}</p>
    </div>
  );
};
export default memo(Tile);

// components/ArticleDetails.tsx

import { Link } from "react-router";
import formatDate from "../../../utils/dateUtils";
import type { ArticleType } from "../../../types/ArticleType";

type ArticleDetailsProps = {
  article: ArticleType;
};

const ArticleDetails = ({ article }: ArticleDetailsProps) => {
  return (
    <>
      <Link
        to="/"
        className="text-blue-500 underline"
        aria-label="Back to home"
      >
        Back to Home
      </Link>

      <div className="p-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
        {article.multimedia?.default?.url && (
          <div className="h-88 mb-8">
            <img
              src={article.multimedia.default.url}
              alt={`Image ${article.headline.main}`}
              className="w-full h-auto rounded max-h-88 object-contain"
            />
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4">{article.headline.main}</h1>
        <p>{article.abstract}</p>
        <i>{article.byline.original}</i>
        <p className="mt-4">{formatDate(article.pub_date)}</p>

        <div className="mt-4">
          <a
            href={article.web_url}
            target="_blank"
            aria-label="Read Full Article"
            className="inline-block px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500 transition-colors duration-200"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;

import { useQuery } from "@tanstack/react-query";
import type { ArticleType } from "../../../types/ArticleType";
import { NYT_API_KEY } from "../../../utils/constants";

export const useGetArticleDetails = (articleUri: string) => {
  const getArticleDetails = async () => {
    const fq = `uri:"${articleUri}"`;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=${encodeURIComponent(
      fq
    )}&api-key=${NYT_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.response.docs[0];
  };

  const { data, isFetching, isError } = useQuery<ArticleType | null>({
    queryKey: ["articleDetails", articleUri],
    queryFn: getArticleDetails,
  });

  return { data, isFetching, isError };
};

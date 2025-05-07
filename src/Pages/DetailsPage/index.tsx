import { useParams } from "react-router";
import { useGetArticleDetails } from "./hooks/useGetArticleDetails";
import Skeleton from "./components/Skeleton";
import Error from "../../components/Error";
import { useLayoutEffect } from "react";
import ArticleDetails from "./components/ArticleDetails";

const DetailsPage = () => {
  const { uri } = useParams();
  const { data, isFetching, isError } = useGetArticleDetails(uri as string);

  // was showing the page scrolled down when navigating from home page (if it was scrolled)
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [uri]);

  if (isFetching) {
    return <Skeleton />;
  }

  if (isError || !data || !uri) {
    return <Error />;
  }

  return <ArticleDetails article={data} />;
};

export default DetailsPage;

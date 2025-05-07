import { useQuery } from "@tanstack/react-query";
import { NYT_API_KEY } from "../../../utils/constants";

export const useGetTopNews = () => {
  const getTopNews = async () => {
    const section = "technology";
    const response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["topNews"],
    queryFn: getTopNews,
  });

  return { data, isPending, isError };
};

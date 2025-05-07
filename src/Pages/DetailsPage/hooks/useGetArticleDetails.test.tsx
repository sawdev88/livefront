import { renderHook, waitFor } from "@testing-library/react";
import { useGetArticleDetails } from "./useGetArticleDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ArticleType } from "../../../types/ArticleType";

jest.mock("../../../utils/constants", () => ({
  NYT_API_KEY: "test-api-key",
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe("useGetArticleDetails", () => {
  const sampleUri = "nyt://article/abc123";

  it("returns article data when fetch succeeds", async () => {
    const mockArticle: ArticleType = {
      title: "Sample Article",
      uri: sampleUri,
      // Add other fields that ArticleType expects here
    } as ArticleType;

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        response: {
          docs: [mockArticle],
        },
      }),
    });

    const { result } = renderHook(() => useGetArticleDetails(sampleUri), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockArticle));

    expect(result.current.isFetching).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("sets isError when fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useGetArticleDetails(sampleUri), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });
});

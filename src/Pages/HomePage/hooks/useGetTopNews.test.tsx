import { renderHook, waitFor } from "@testing-library/react";
import { useGetTopNews } from "./useGetTopNews";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

describe("useGetTopNews", () => {
  it("returns data when fetch is successful", async () => {
    const mockNews = [{ title: "Article 1", uri: "nyt://article/abc" }];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: mockNews }),
    });

    const { result } = renderHook(() => useGetTopNews(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockNews));

    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("sets isError when fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useGetTopNews(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });
});
